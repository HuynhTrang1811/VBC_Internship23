import { ethers } from 'ethers';
import { getERC20TokenAbi, getMarketAbi } from './utils/getAbis';
import { nftContract } from './accountMint';
import { erc20tokenAddress, marketcontractAddress } from '../constants/constants';
import { marketcontractAddresses } from '../constants/constants';
export const rentNft = async (type: string, tokenID: number, renttime: any, deposit: any, rentalpayment: any) => {
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

  const _deposit = ethers.utils.parseUnits((deposit).toString(), 'ether');
  const _rentalpayment = ethers.utils.parseUnits((rentalpayment).toString(), 'ether'); 
  // Create a contract instance
  const contract = new ethers.Contract(contractAddress, abi, signer);
  async function rent() {
    const tx = await nftcontract.approve(contractAddress, tokenID);

    // Wait for the transaction to be mined
    await tx.wait();
    const tx1 = await contract.rentOutNFT(marketcontractAddresses[type], tokenID, renttime, _deposit, _rentalpayment);
    await tx1.wait();

    console.log('rent successful!');

  };
  await rent();
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

export const starRentNFT = async (type: string, tokenID: number, address: string) => {
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

  const erc20contract = new ethers.Contract(erc20tokenAddress, getERC20TokenAbi(), signer)
  const allowance = await erc20contract.allowance(address, marketcontractAddress);
  const tokensToApprove = ethers.utils.parseUnits('1000', 'ether');
  if (allowance < tokensToApprove) {
    const tx = await erc20contract.approve(marketcontractAddress)
    await tx.wait();
  }
  // Create a contract instance
  const contract = new ethers.Contract(contractAddress, abi, signer);
  async function startrent() {
    // const tx = await nftcontract.approve(contractAddress, tokenID);

    // Wait for the transaction to be mined
    // await tx.wait();
    const tx1 = await contract.startRentingNFT(marketcontractAddresses[type], tokenID);
    await tx1.wait();

  };
  await startrent();
}