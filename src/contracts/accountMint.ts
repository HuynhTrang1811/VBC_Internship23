import { ethers } from 'ethers';
import {get} from './utils/getAbis';


export const mintAccount = async (login: any, rentalTime:any) => {// ABI of the smart contract
    const abi = get();
    
    ethers.providers.getNetwork(8888)
    // Address of the smart contract
    const contractAddress = '0x48220D442132b9FFFd281E2f717468B7B390e8b4'; // Replace with your contract address
    
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
    const tx = await contract.setBaseURI('https://ipfs.moralis.io:2053/ipfs/Qmdk7xhJ6USs2t33UhNmNnW13nTupFJHXXuY9FdZNPKJtN/Netflixaccounts');
    const reveal = await contract.setReveal();
    // Mint function
    async function mint(login: string, rentalTime: number) {
      try {
        // Estimate the gas required for the transaction
        // const gasLimit = await contract.estimateGas.accountMint(login, rentalTime);
    
        // Build the transaction data
        const tx = await contract.accountMint(login, rentalTime);
    
        // Wait for the transaction to be mined
        // const receipt = await signer.sendTransaction({ ...tx, gasLimit });
    
        // console.log('Transaction hash:', receipt.hash);
        console.log('Mint successful!');
      } catch (error) {
        console.error('Error:', error);
      }
    }
    
    // Usage example
    
    mint(login, rentalTime);
    
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
    // printMintTransactionInfo();
        
    // function getExpirationtime() {
    //   const filter = contract.filters.NFTMinted();

    //   // Event listener to capture the minter's address
    //   contract.on(filter, async (minter, tokenId) => {
    //   console.log('Minter:', minter);
    //   console.log('Token ID:', tokenId.toNumber());

    //  // Get the minted NFT from the mapping
    //   const mintedNFT = await contract.nfts(tokenId);
    //   const expirationTime = mintedNFT.expirationTime.toNumber();
    //   console.log('Expiration Time:', expirationTime);
    //   const expirationDate = new Date(expirationTime * 1000);

    // // Extract month and year from the Date object
    //   const month = expirationDate.toLocaleString('default', { month: 'long' });
    //   const year = expirationDate.getFullYear();

    //   console.log('Expiration Date:', month, year);
    //   });
    // }
    // getExpirationtime();
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
    
    
}
