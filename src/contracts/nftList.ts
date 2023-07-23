import { ethers } from 'ethers';
import {getMarketAbi} from './utils/getAbis';
import { nftContract } from './accountMint';
export const listNft = async (tokenID : number, price : any) => {
  console.log(tokenID); 
    const abi = getMarketAbi();
    const provider = new ethers.providers.Web3Provider((window as any).ethereum)
    const contractAddress = '0x66F418bB2bCD7A8a5BAA80DC678F9Af5c26ace5a'
    const nftcontract = await nftContract(); 
    // MetaMask requires requesting permission to connect users accounts
    await provider.send("eth_requestAccounts", []);
    
    // The MetaMask plugin also allows signing transactions to
    // send ether and pay to change state within the blockchain.
    // For this, you need the account signer...
    const signer = provider.getSigner()
    
    
    // Create a contract instance
    const contract = new ethers.Contract(contractAddress, abi, signer);
    async function list(){
        try {
          const tx = await nftcontract.approve(contractAddress, tokenID);
          
          // Wait for the transaction to be mined
          await tx.wait();
            const tx1 = await contract.listNft(tokenID,price);
            
            
            console.log('list successful!');
          } catch (error) {
            console.error('Error:', error);
          }

    };
    await list(); 
}