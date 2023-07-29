import { useEffect, useState } from "react";
import './Header.css'
import '../button/Button.css'
import axios from "../../../api";
const ConnectWallet = () => {
    interface User {
        address: string
    }

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





    }, [])

    const [walletAdress, setAdress] = useState("Connect Wallet");
    const [user, setUser] = useState<User[]>([]);
  
    // const [have_user, setHaveUser] = useState([])
 
    const checkUser=()=>{
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
                const accounts = await (window as any).ethereum.request({ method: "eth_requestAccounts",params: [{
                    chainId: "0x89",
                    rpcUrls: ["https://sepolia.infura.io/v3/"],
                    chainName: "Sepolia test network",
                    nativeCurrency: {
                        name: "MATIC",
                        symbol: "MATIC",
                        decimals: 18
                    },
                    blockExplorerUrls: ["https://polygonscan.com/"]
                }] });
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
                const accounts = await (window as any).ethereum.request({ method: "eth_accounts" });
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
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/1200px-MetaMask_Fox.svg.png" style={{ width: 30, height: 30 }} />
                <div className="address-button">{walletAdress.substring(0, 8)}...{walletAdress.substring(38)}</div>
            </div>

        </header>


    );
}
export default ConnectWallet;