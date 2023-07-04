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
    
    // async function getNFTInformation(tokenId) {
    //     try {
    //       // Call the contract's getNFTData function
    //       const nftData = await contract.getNFTData(tokenId);
      
    //       // Retrieve the data from the returned values
    //       const name = nftData.name;
    //       const description = nftData.description;
    //       const image = nftData.image;
      
    //       // Call the contract's ownerOf function
    //       const owner = await contract.ownerOf(tokenId);
      
    //       return { tokenId, name, description, image, owner };
    //     } catch (error) {
    //       console.error('Error retrieving NFT information:', error);
    //       throw error;
    //     }
    //   }
      
    //   // Example usage
    //   const tokenID = 123; // Replace with the desired token ID
    //   getNFTInformation(tokenID).then((nftInformation) => {
    //     console.log('NFT Information:', nftInformation);
    //   });
      
      
      
      
      
      
      
      
    
    
}
