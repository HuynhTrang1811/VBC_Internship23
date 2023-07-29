// import { nftContract } from '../../contracts/accountMint';
import { mintAccount } from '../../contracts/accountMint';
import "./Home.css"
import Grid from '@mui/material/Grid';
import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { IconButton } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import axios from "../../api"
import { ethers } from 'ethers';
import { getcurentWalletconnect } from '../../contracts/utils/getAbis'
import { contractAddress, nftGenerator } from '../../constants/constants'

export interface INFT {
    name?: string
    img?: string
    price?: string
    expirationDateTime?: String
    time_out?: Date
    minter?: string
    tokenID?: number
    state?: 'renting' | 'selling' | 'minted'
    tokenURI: string
}
const Banner = () => {
    const data_category = [

        { name: "HBO", img: "https://i.pinimg.com/236x/8b/02/00/8b020050690f955ccb306cdf51324aea.jpg" },
        { name: "DISNEY+", img: "https://i.pinimg.com/236x/44/91/d1/4491d1ca70ffaf6be7c591a9b463f7e8.jpg" },
        { name: "IQIY", img: "https://i.pinimg.com/236x/e9/2a/91/e92a91f61fa1013670918df4cafe7ba2.jpg" },
        { name: "YOUTUBE", img: "https://muataikhoan.vn/wp-content/uploads/2022/11/cg3oLO.svg" },
        { name: "SPOTIFY", img: "https://muataikhoan.vn/wp-content/uploads/2022/10/Spotify-Premium.png" },
        { name: "VIEON", img: "https://muataikhoan.vn/wp-content/uploads/2022/11/VieON-1.png" },
        { name: "FPTPLAY", img: "https://muataikhoan.vn/wp-content/uploads/2023/06/FPT-Play.jpg" }


    ]
    const [open, setOpen] = useState(false);
    const [openNetflix, setOpenNetflix] = useState(false);
    const [openMint, setOpenMint] = useState(false);
    const [months, setMonths] = useState(0);
    const [mintNFT, setMintNFT] = useState<INFT>({ tokenURI: '' });
    const [openBacklog, setOpenBacklog] = useState(false);
    const handleOpenBacklog = () => {
        setOpenBacklog(true);
    };
    const handleClickOpen = () => {
        setOpen(true);

    };
    const handleNetflix = () => {
        setOpenNetflix(true);

    };


    const handleClose = () => {

        setOpen(false);
        setOpenNetflix(false);
    };
    const handleCloseNetflix = () => {
        setOpenNetflix(false);
    };
    const handleCloseMint = () => {
        setOpenMint(false);
    };
    const handleMint = async () => {
        console.log(months);
        // setOpenMint(true);
        setOpenBacklog(true);
        const message = ethers.utils.solidityKeccak256(
            ['address', 'address'],
            [
                contractAddress,
                await getcurentWalletconnect(),
            ],
        )
        console.log(message)
        const arrayifyMessage = ethers.utils.arrayify(message)
        const provider = new ethers.providers.Web3Provider((window as any).ethereum)
        console.log(arrayifyMessage)
        const signer = new ethers.Wallet('0x3bec6420095c3c1dec78e0bc1d9d456666392d174ba127bbcbbf8a62bee65965', provider)
        const flatSignature = await signer.signMessage(arrayifyMessage)
        console.log(flatSignature)
        const nonce = 1;
        try {
            const data: any = await mintAccount('hiep', months, flatSignature);

            const nft = nftGenerator();
            if (data != null) {
                console.log(data);
                const bodyData = {
                    name: nft.name,
                    img: nft.nft,
                    price: "0",
                    expirationDateTime: data.expirationDateTime,
                    minter: (data.minter as string).toLowerCase(),
                    tokenID: parseInt(data.tokenId),
                    tokenURI: data.tokenURI,
                    status: "owner"
                }
                console.log(bodyData)
                setOpenMint(true);
                setOpenBacklog(false);
                setMintNFT(bodyData);
                axios.post('/route/createNFT', bodyData)

            }
        } catch (err: any) {
            console.error(err.message);

        }


    };
    const [copied, setCopied] = useState(false);

    const Copy_NFT = () => {
        setCopied(true);
        navigator.clipboard.writeText(mintNFT.tokenURI).then(() => {
            console.log(mintNFT.tokenURI)
        })
        setTimeout(() => {
            setCopied(false);


        }, 500);

    };
    const [active, setActive] = useState(false)

    return (
        <div className='hero-container'>
            {/* <video src={video} autoPlay loop muted /> */}
            <h1>NFT MARKETPLACE</h1>
            <h3>What are you waiting for ?</h3>
            <h3>Buy NFTs and enjoy your wonderful experiences !</h3>
            <div className='hero-btns'>
                <Button size="large" className="app-home-banner-button" variant="contained" onClick={handleClickOpen}>Buy new NFT !</Button>

                <form>
                    {/* Form BUy NFT  */}
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                        id="alert"
                    >
                        <div className="alert-account">
                            <DialogTitle id="alert-dialog-title">
                                {"ACCOUNT CATEGORIES"}
                            </DialogTitle>
                            <DialogContent id="alert-dialog-content">
                                <Grid container spacing={2} columns={24}>
                                    <Grid item xs={6}>

                                        <DialogContent onClick={handleNetflix}>
                                            <DialogContentText id="alert-dialog-description">
                                                <div className='account-category'>

                                                    <img id='img-category' src="https://i.pinimg.com/564x/0c/cc/0a/0ccc0ad61d6a1b18f7d53e636ba0979c.jpg" />

                                                    <div className='name-category'>NETFLIX</div>
                                                </div>
                                            </DialogContentText>
                                        </DialogContent>
                                    </Grid>
                                    {data_category.map((items: any) => {

                                        return (<Grid item xs={6}>

                                            <DialogContent>
                                                <DialogContentText id="alert-dialog-description">
                                                    <div className='account-category'>

                                                        <img id='img-category' src={items.img} />

                                                        <div className='name-category'>{items.name}</div>
                                                    </div>
                                                </DialogContentText>
                                            </DialogContent>
                                        </Grid>)
                                    })}


                                </Grid>
                            </DialogContent>
                            <DialogActions>

                                <Button className='account-button' variant="contained" onClick={handleClose} autoFocus>
                                    Close
                                </Button>

                            </DialogActions>
                        </div>
                    </Dialog>
                    {/* Form Buy Netflix  */}
                    <Dialog

                        open={openNetflix}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    ><div className="alert-buyNFT">
                            <DialogTitle id="alert-dialog-title">
                                {"BUY NFT NETFLIX"}
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description-buyNFT">
                                    Enter number of month: <input id="input_text" type="text" onChange={(e) => {
                                        setMonths(+e.target.value);
                                    }} ></input>
                                    {/* <input></input> */}
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button size="small" variant="outlined" onClick={function (event) { handleClose(); handleMint(); handleOpenBacklog() }}>Payment</Button>

                                <Button size="small" variant="outlined" onClick={handleClose} autoFocus>
                                    Close
                                </Button>

                            </DialogActions>
                        </div>
                    </Dialog>

                    <Dialog

                        open={openMint}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                        sx={{
                            backdropFilter: "blur(5px) sepia(5%)",
                            // 👇 Another option to style Paper
                            "& .MuiDialog-paper": {
                                borderRadius: "20px",
                                border: "5px solid  rgb(20, 6, 68)"
                            },
                        }}
                    >
                        <div id="mint_NFT_form">
                            <DialogTitle id="alert-dialog-title"  >
                                NFT INFORMATION
                            </DialogTitle>

                            <div id="alert-dialog-description">
                                <div className='alert-img'> <img className='alert-mintNFT-img' src={mintNFT.img} /></div>
                                {/* <div > {mintNFT.minter}<br /></div>
                                <div>  Token ID: {mintNFT.tokenId}<br /></div>
                                <div>  Expirationdate: {mintNFT.expirationDateTime}<br /> </div>
                                <div>Token URI:         <ContentCopyIcon onClick={Copy_NFT} /> </div> */}
                                <Grid container rowSpacing={1} columnSpacing={{}}>
                                    <Grid className='alert-title' item xs={5}>
                                        Minter Address:
                                    </Grid>
                                    <Grid item xs={7}>
                                        {mintNFT.minter?.substring(0, 10)}...{mintNFT.minter?.substring(35)}
                                    </Grid>
                                    <Grid className='alert-title' item xs={5}>
                                        Token ID:
                                    </Grid>
                                    <Grid item xs={7}>
                                        {mintNFT.tokenID}
                                    </Grid>
                                    <Grid className='alert-title' item xs={5}>
                                        Expirationdate:
                                    </Grid>
                                    <Grid item xs={7}>
                                        {mintNFT.expirationDateTime}
                                    </Grid>
                                    <Grid className='alert-title' item xs={5}>
                                        Token URI:
                                    </Grid>
                                    <Grid item xs={7}>
                                        {/* <ContentCopyIcon onClick={Copy_NFT} />  */}
                                        {/* <IconButton onClick={() => setClicked(true)}>
                                            {clicked ? <ContentCopyIcon /> : <IconButton  />}
                                        </IconButton> */}
                                        <IconButton size="small" onClick={e => {
                                            setActive(!active);
                                            Copy_NFT();
                                        }}>
                                            {active ? <CheckIcon /> : <ContentCopyIcon />}
                                        </IconButton>
                                    </Grid>
                                </Grid>





                            </div>

                            <div className='alert-close'>
                                <Button variant="outlined" className='alert-close-button' onClick={handleCloseMint} size="large" autoFocus>close</Button>

                            </div>
                        </div>
                    </Dialog>
                    <Backdrop
                        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                        open={openBacklog}
                        onClick={handleClose}
                    >
                        <CircularProgress color="inherit" />
                    </Backdrop>
                </form>
            </div>
        </div>
    );
}

export default Banner