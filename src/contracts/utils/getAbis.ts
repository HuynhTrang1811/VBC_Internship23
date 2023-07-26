import NBAcardabi from '../abis/NFTbase.json';
import MarketAbi from '../abis/market.json';

export const get = () => NBAcardabi ;
export const getMarketAbi = () => MarketAbi;

export const getcurentWalletconnect = async () => {
    if (typeof window != "undefined" && typeof(window as any).ethereum != "undefined") {
        try {
            const accounts = await (window as any).ethereum.request({ method: "eth_accounts" });
            console.log(accounts[0])
            return accounts[0] ;

        }
        catch (err) {
            alert(`Something went wrong: ${err}`);
        }
    } else {
        console.log("Metamask is not install!")
    }
}