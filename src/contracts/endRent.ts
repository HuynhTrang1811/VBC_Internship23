import { ethers } from 'ethers';
import {getMarketAbi} from './utils/getAbis';
import { nftContract } from './accountMint';
import { marketcontractAddress } from '../constants/constants';
import { marketcontractAddresses } from '../constants/constants';
export const endRent = async (type : any, tokenID : number) => {
  
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
    async function rent(){
          
          const tx = await nftcontract.approve(contractAddress, tokenID);
          
          // Wait for the transaction to be mined
          await tx.wait();
            const tx1 = await contract.endRentingNFT(marketcontractAddresses[type],tokenID);
            await tx1.wait();
            
          
    };
    await rent(); 
}
export const getMoney = async ( tokenID : number) => {
  
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
  async function getmoney(){
        
        
          const tx1 = await contract.withdrawnCollateral(tokenID);
          await tx1.wait();
          
        
  };
  await getmoney(); 
}
// export const unlistNft = async (type: string, tokenID : number) => {
//   console.log(tokenID); 
//     const abi = getMarketAbi();
//     const provider = new ethers.providers.Web3Provider((window as any).ethereum)
//     const contractAddress = marketcontractAddress
//     const nftcontract = await nftContract(); 
//     // MetaMask requires requesting permission to connect users accounts
//     await provider.send("eth_requestAccounts", []);
    
//     // The MetaMask plugin also allows signing transactions to
//     // send ether and pay to change state within the blockchain.
//     // For this, you need the account signer...
//     const signer = provider.getSigner()
    
    
//     // Create a contract instance
//     const contract = new ethers.Contract(contractAddress, abi, signer);
//     async function unrent(){
//           // const tx = await nftcontract.approve(contractAddress, tokenID);
          
//           // Wait for the transaction to be mined
//           // await tx.wait();
//             const tx1 = await contract.unlistNft(marketcontractAddresses[type],tokenID);
//             await tx1.wait();

//     };
//     await unrent(); 
// }

