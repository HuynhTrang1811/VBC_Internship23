import { ethers } from 'ethers';
import { getMarketAbi } from './utils/getAbis';

export const listNft = async (tokenID: number, price: any) => {

  const abi = getMarketAbi();
  const provider = new ethers.providers.Web3Provider((window as any).ethereum)
  const contractAddress = '0x7092E934270DBEEbac1e4f91dD1f3D6E997839b9'
  // MetaMask requires requesting permission to connect users accounts
  await provider.send("eth_requestAccounts", []);

  // The MetaMask plugin also allows signing transactions to
  // send ether and pay to change state within the blockchain.
  // For this, you need the account signer...
  const signer = provider.getSigner()


  // Create a contract instance
  const contract = new ethers.Contract(contractAddress, abi, signer);
  async function list() {
    try {

      const tx = await contract.listNFT(tokenID, price);


      console.log('list successful!');
    } catch (error) {
      console.error('Error:', error);
    }

  };
}