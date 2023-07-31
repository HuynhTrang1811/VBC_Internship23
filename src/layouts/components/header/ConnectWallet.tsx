import { useEffect, useState } from "react";
import './Header.css'
import '../button/Button.css'
import axios from "../../../api";
import { Button, FormControl, InputLabel, MenuItem, NativeSelect, Select } from "@mui/material";
import { socket } from "../../../api/socket";
import { useGlobalContext } from "../../../store/GlobalContext";
import { getCurrentBalace } from "../../../contracts/nftList";
let x = '';
let bl = '';
const ConnectWallet = () => {
    interface User {
        address: string
    }

    const [walletAdress, setAdress] = useState("");
    const [user, setUser] = useState<User[]>([]);
    const { state, dispatch } = useGlobalContext();
    const [balance, setBalance] = useState("0");
    // const [have_user, setHaveUser] = useState([])
    // Khởi tạo state và sử dụng kiểu dữ liệu Product
    useEffect(() => {

        getcurentWalletconnect();
        checkUser()
        axios.get('/user/getUser')
            .then((res) => {
                setUser(res.data)
                console.log(res.data)
            })
            .catch(error => console.log(error))
        const interval = asyncInterval(async () => {
            const accounts = await (window as any).ethereum.request({ method: "eth_accounts" });
            if (accounts[0].toLowerCase() !== x) {
                setAdress(accounts[0].toLowerCase());
                if (x !== "") {
                    console.log(x);
                    dispatch({ type: "SET_UPDATE_MAIN", payload: !state.update_main });
                    dispatch({ type: "SET_UPDATE_USER", payload: !state.update_user });
                }
                x = accounts[0];
            }

            if (x !== "") {
                const getbl = await getCurrentBalace(x);
                if (getbl !== bl) {
                    setBalance(getbl);
                }
                bl = getbl;
            }
        }, 2500)


    }, [])
    async function asyncInterval(asyncFn: any, interval: any): Promise<any> {
        try {
            await asyncFn();
        } catch (error) {
            console.error("Error in the async function:", error);
        }

        // Wait for the specified interval before running the function again
        setTimeout(() => asyncInterval(asyncFn, interval), interval);
    }
    const checkUser = () => {
        if (walletAdress != 'Connect Wallet') {
            localStorage.setItem('userAddress', walletAdress);

            let flag = 0;
            user.map((users: any) => {

                if (users.address === walletAdress) { flag = 1 }
            })

            const data = { address: walletAdress };
            if (flag === 0) {
                console.log('post')
                axios.post('/user/newUser', data)
                    .then((request) => {
                        console.log('Post data success:', request.data);
                    })
                    .catch((error) => {
                        console.error('Error posting data:', error);
                    });
            }


        }

    }
    const connectWallet = async () => {
        if (typeof window != "undefined" && typeof (window as any).ethereum != "undefined") {
            try {
                const chainId = await (window as any).ethereum.request({ method: "eth_chainId" });
                console.log("Current chain ID ", chainId)
                if (chainId === '0xaa36a7') {
                    console.log('current network is sepolia ')
                }
                else {
                    console.log('need to change network ')
                    await (window as any).ethereum.request({
                        method: "wallet_addEthereumChain",
                        params: [
                            {
                                chainId: '0xaa36a7',
                                chainName: "Sepolia Network", // Replace with the desired network name
                                nativeCurrency: {
                                    name: "Sepolia Ether", // Replace with the desired native currency name
                                    symbol: "ETH", // Replace with the desired currency symbol
                                    decimals: 18,
                                },
                                rpcUrls: ["https://rpc.sepolia.org", "https://ethereum-sepolia.blockpi.network/v1/rpc/public"], // Replace with the desired RPC URL
                                blockExplorerUrls: ["https://sepolia.etherscan.io/"], // Replace with the desired block explorer URL
                            },
                        ],
                    });
                }
                const accounts = await (window as any).ethereum.request({
                    method: "eth_requestAccounts", params: [{
                        chainId: "0x89",
                        rpcUrls: ["https://sepolia.infura.io/v3/"],
                        chainName: "Sepolia test network",
                        nativeCurrency: {
                            name: "MATIC",
                            symbol: "MATIC",
                            decimals: 18
                        },
                        blockExplorerUrls: ["https://polygonscan.com/"]
                    }]
                });
                setAdress(accounts[0])
                checkUser();






            }
            catch (err) {
                alert(`Something went wrong: ${err}`);
            }
        } else {
            console.log("Metamask is not install!");
            alert(`Metamask is not install!`);
        }
    }
    const getcurentWalletconnect = async () => {
        if (typeof window != "undefined" && typeof (window as any).ethereum != "undefined") {
            try {

                const accounts: string[] = await (window as any).ethereum.request({ method: "eth_accounts" });
                if (accounts.length > 0) {
                    setAdress(accounts[0])
                    checkUser()


                }
                else {
                    console.log("connect metamask using connect button")
                }

            }
            catch (err) {
                alert(`Something went wrong: ${err}`);
            }
        } else {
            console.log("Metamask is not install!")
        }
    }

    return (


        <header className="header-button">

            <div className="button-wallet" onClick={connectWallet}>
                {walletAdress === "" || !walletAdress ? <Button>Connect Wallet</Button> : (
                    <><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/1200px-MetaMask_Fox.svg.png" style={{ width: 30, height: 30 }} />
                        <div className="address-button">{walletAdress.substring(0, 8)}...{walletAdress.substring(38)}</div>
                    </>)}

            </div>
            <div className="balance">Balance: {balance}</div>
        </header >


    );
}
export default ConnectWallet;