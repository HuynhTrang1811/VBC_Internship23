import { useEffect, useState } from "react";
import './Header.css'
const ButtonConnect = () => {
    const [walletAdress, setAdress] = useState("Connect Wallet");

    useEffect(() => {
        getcurentWalletconnect();

    })
    const connectWallet = async () => {
        if (typeof window != "undefined" && typeof (window as any).ethereum != "undefined") {
            try {
                const accounts = await (window as any).ethereum.request({ method: "eth_requestAccounts" });
                setAdress(accounts[0])
               
            }
            catch (err: any) {
                alert(`Something went wrong: ${err}`);
            }
        } else {
            console.log("Metamask is not install!")
        }
    }
    const getcurentWalletconnect = async () => {
        if (typeof window != "undefined" && typeof (window as any).ethereum != "undefined") {
            try {
                const accounts = await (window as any).ethereum.request({ method: "eth_accounts" });
                if (accounts.length > 0) {
                    setAdress(accounts[0])
                  
                }
                else {
                    console.log("connect metamask using connect button")
                }

            }
            catch (err: any) {
                alert(`Something went wrong: ${err}`);
            }
        } else {
            console.log("Metamask is not install!")
        }
    }


    return (
        <div className="App">
            <header className="App-header">

                <div className="app-header-button" onClick={connectWallet}>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/1200px-MetaMask_Fox.svg.png" style={{ width: 30, height: 30 }} />
                    <div className="app-header-button-1">{walletAdress.substring(0, 14)}...{walletAdress.substring(35)}</div>
                </div>

            </header>
        </div>
       
    );
}
export default ButtonConnect;