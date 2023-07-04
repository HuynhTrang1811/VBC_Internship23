import { ethers } from 'ethers';
import {get} from './utils/getAbis';


export const mintAccount = async (login: any, rentalTime:any) => {// ABI of the smart contract
    const abi = get();
    
    ethers.providers.getNetwork(8888)
    // Address of the smart contract
    const contractAddress = '0xB9AB4A32c4ccdefB92De3cBca4B2EBBde61ED334'; // Replace with your contract address
    
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
    printMintTransactionInfo();
}
