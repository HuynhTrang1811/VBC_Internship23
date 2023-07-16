import { useEffect, useState } from "react";
import './Header.css'
import '../button/Button.css'
const ConnectWallet = () => {
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
            catch (err) {
                alert(`Something went wrong: ${err}`);
            }
        } else {
            console.log("Metamask is not install!");
            alert(`Metamask is not install!`);
        }
    }
    const getcurentWalletconnect = async () => {
        if (typeof window != "undefined" && typeof(window as any).ethereum != "undefined") {
            try {
                const accounts = await (window as any).ethereum.request({ method: "eth_accounts" });
                if (accounts.length > 0) {
                    setAdress(accounts[0])
                  
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
                    <div className="address-button">{walletAdress.substring(0,8)}...{walletAdress.substring(38)}</div>
                </div>

            </header>
      
       
    );
}
export default ConnectWallet;