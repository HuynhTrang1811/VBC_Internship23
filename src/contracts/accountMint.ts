import { ethers } from 'ethers';
import {get} from './utils/getAbis';
import {contractAddress} from '../constants/constants'

// or if its not ESmodule 

// require('dotenv').config()


export const nftContract = async () => {
  const abi = get();
    
  ethers.providers.getNetwork(8888)
  // Address of the smart contract
  
  // Ethereum node URL
  const nodeUrl = 'https://agridential.vbchain.vn/VBCinternship2023'; // Replace with your Ethereum node URL
  
  // Create a provider instance
  const provider = new ethers.providers.Web3Provider((window as any).ethereum)

  // MetaMask requires requesting permission to connect users accounts
  await provider.send("eth_requestAccounts", []);
  
  // The MetaMask plugin also allows signing transactions to
  // send ether and pay to change state within the blockchain.
  // For this, you need the account signer...
  const signer = provider.getSigner()
  
  // Create a contract instance
  return new ethers.Contract(contractAddress, abi, signer);
}

export const mintAccount = async (login: any, rentalTime:any, signature: any ) => {// ABI of the smart contract
    const abi = get();
    
    ethers.providers.getNetwork(8888)
    // Address of the smart contract
    const contractAddress = (await nftContract()).address; // Replace with your contract address
    
    // Ethereum node URL
    const nodeUrl = 'https://agridential.vbchain.vn/VBCinternship2023'; // Replace with your Ethereum node URL
    
    // Create a provider instance
    const provider = new ethers.providers.Web3Provider((window as any).ethereum)

    // MetaMask requires requesting permission to connect users accounts
    await provider.send("eth_requestAccounts", []);
    
    // The MetaMask plugin also allows signing transactions to
    // send ether and pay to change state within the blockchain.
    // For this, you need the account signer...
    const signer = provider.getSigner()
    
    // Create a contract instance
    const contract = new ethers.Contract(contractAddress, abi, signer);
    
    
    // Mint function
    async function mint(login: string, rentalTime: number, signature: any ) {
      try {
        // console.log(ethers.utils.base58.decode(signature));
        const tx = await contract.accountMint(login, rentalTime, signature );
        
        
        console.log('Mint successful!');
      } catch (error) {
        console.error('Error:', error);
      }
    }

    
    mint(login, rentalTime,signature) ;
    
    function printMintTransactionInfo() {
        contract.on('Transfer', (from, to, tokenId, event) => {
          console.log('Mint Transaction Information:');
          console.log('From:', from);
          console.log('To:', to);
          console.log('Token ID:', tokenId.toString());
          console.log('Transaction Hash:', event.transactionHash);
          console.log('Block Number:', event.blockNumber);
          console.log('--------------------------------------');
        });
      }  
    
    function getMintTransactionInfo() {
        return new Promise((resolve, reject) => {
        contract.on('Transfer', (from, to, tokenId, event) => {
        const mintTransactionInfo = {
        from: from,
        to: to,
        tokenId: tokenId.toString(),
        transactionHash: event.transactionHash,
        blockNumber: event.blockNumber,
        };
        resolve(mintTransactionInfo);
        });
        });
        }
  
    function getExpirationDateTime(): Promise<{ minter: string, tokenId: number, expirationDateTime: string, tokenURI:string }> {
      return new Promise((resolve, reject) => {
        const filter = contract.filters.NFTMinted();
    
        // Event listener to capture the minter's address
        contract.on(filter, async (minter, tokenId) => {
          const mintedNFT = await contract.nfts(tokenId);
          const expirationTime = mintedNFT.expirationTime.toNumber();
          const expirationDate = new Date(expirationTime * 1000);
          
          const expirationDateTime = expirationDate.toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' });
          const tokenURI = await contract.tokenURI(tokenId);
          const data = {
            minter: minter,
            tokenId: tokenId.toNumber(),
            expirationDateTime: expirationDateTime,
            tokenURI: tokenURI
          };
    
          resolve(data);
        });
    
        // Reject the promise if an error occurs
        contract.on('error', error => {
          reject(error);
        });
      });
    }
    getExpirationDateTime().then((data)=>{
        console.log('Minter:', data.minter);
        console.log('Token ID:', data.tokenId);
        console.log('Expirationdate:',data.expirationDateTime);
        console.log('Token URI:', data.tokenURI) ; 
    })
    return getExpirationDateTime();
    
    
}
