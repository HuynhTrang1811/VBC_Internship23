import { ethers } from 'ethers';
import { getERC20TokenAbi, getMarketAbi } from './utils/getAbis';
import { nftContract } from './accountMint';
import { erc20tokenAddress, marketcontractAddress } from '../constants/constants';
import { marketcontractAddresses } from '../constants/constants';
export const listNft = async (type: string, tokenID: number, price: any) => {
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
  async function list() {
    const tx = await nftcontract.approve(contractAddress, tokenID);

    // Wait for the transaction to be mined
    await tx.wait();
    const tx1 = await contract.listNft(marketcontractAddresses[type], tokenID, price);
    await tx1.wait();

  };
  await list();
  return true;
}

export const unlistNft = async (type: string, tokenID: number) => {
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
  async function unlist() {
    // const tx = await nftcontract.approve(contractAddress, tokenID);

    // Wait for the transaction to be mined
    // await tx.wait();
    const tx1 = await contract.unlistNft(marketcontractAddresses[type], tokenID);
    await tx1.wait();

  };
  await unlist();
}

export const buyNFT = async (type: string, tokenID: number, price: number, address: string) => {
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
  const tokensToApprove = ethers.utils.parseUnits(price.toString(), 'ether');
  console.log(tokensToApprove)
  if (allowance < tokensToApprove) {
    const tx = await erc20contract.approve(marketcontractAddress)
    await tx.wait();
  }

  // Create a contract instance
  const contract = new ethers.Contract(contractAddress, abi, signer);
  async function unlist() {
    // const tx = await nftcontract.approve(contractAddress, tokenID);

    // Wait for the transaction to be mined
    // await tx.wait();
    const tx1 = await contract.buyNft(marketcontractAddresses[type], tokenID, tokensToApprove);
    await tx1.wait();

  };
  await unlist();
  return true;
}
function removeDigitsAfterDot(inputString: string) {
  const dotIndex = inputString.indexOf('.');
  if (dotIndex !== -1) {
    const remainingDigits = inputString.slice(0, dotIndex); // Extract including one digit after the dot
    return remainingDigits;
  }
  return inputString;
}
export const getCurrentBalace = async (address: string) => {
  const provider = new ethers.providers.Web3Provider((window as any).ethereum)

  const signer = provider.getSigner()
  const erc20contract = new ethers.Contract(erc20tokenAddress, getERC20TokenAbi(), signer)
  const balance = ((await erc20contract.balanceOf(address)).toString());
  const decimals = await erc20contract.decimals();

  // Calculate the balance in ether units
  const balanceInEther = ethers.utils.formatUnits(balance, decimals);
  console.log(balanceInEther)
  return removeDigitsAfterDot(balanceInEther);

}