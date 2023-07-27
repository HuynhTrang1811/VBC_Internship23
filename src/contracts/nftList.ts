import { ethers } from 'ethers';
import {getMarketAbi} from './utils/getAbis';
import { nftContract } from './accountMint';
import { marketcontractAddress } from '../constants/constants';
import { marketcontractAddresses } from '../constants/constants';
export const listNft = async (type: string, tokenID : number, price : any) => {
  console.log(tokenID); 
    const abi = getMarketAbi();
    const provider = new ethers.providers.Web3Provider((window as any).ethereum)
    const contractAddress = marketcontractAddress
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
          const tx = await nftcontract.approve(contractAddress, tokenID);
          
          // Wait for the transaction to be mined
          await tx.wait();
            const tx1 = await contract.listNft(marketcontractAddresses[type],tokenID,price);
            await tx1.wait();

    };
    await list(); 
}

export const unlistNft = async (type: string, tokenID : number) => {
  console.log(tokenID); 
    const abi = getMarketAbi();
    const provider = new ethers.providers.Web3Provider((window as any).ethereum)
    const contractAddress = marketcontractAddress
    const nftcontract = await nftContract(); 
    // MetaMask requires requesting permission to connect users accounts
    await provider.send("eth_requestAccounts", []);
    
    // The MetaMask plugin also allows signing transactions to
    // send ether and pay to change state within the blockchain.
    // For this, you need the account signer...
    const signer = provider.getSigner()
    
    
    // Create a contract instance
    const contract = new ethers.Contract(contractAddress, abi, signer);
    async function unlist(){
          // const tx = await nftcontract.approve(contractAddress, tokenID);
          
          // Wait for the transaction to be mined
          // await tx.wait();
            const tx1 = await contract.unlistNft(marketcontractAddresses[type],tokenID);
            await tx1.wait();

    };
    await unlist(); 
}

export const buyNFT = async (type: string, tokenID : number, price:number) => {
  console.log(tokenID); 
    const abi = getMarketAbi();
    const provider = new ethers.providers.Web3Provider((window as any).ethereum)
    const contractAddress = marketcontractAddress
    const nftcontract = await nftContract(); 
    // MetaMask requires requesting permission to connect users accounts
    await provider.send("eth_requestAccounts", []);
    
    // The MetaMask plugin also allows signing transactions to
    // send ether and pay to change state within the blockchain.
    // For this, you need the account signer...
    const signer = provider.getSigner()
    
    
    // Create a contract instance
    const contract = new ethers.Contract(contractAddress, abi, signer);
    async function unlist(){
          // const tx = await nftcontract.approve(contractAddress, tokenID);
          
          // Wait for the transaction to be mined
          // await tx.wait();
            const tx1 = await contract.buyNft(marketcontractAddresses[type],tokenID, price);
            await tx1.wait();

    };
    await unlist(); 
}