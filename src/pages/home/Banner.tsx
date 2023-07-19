
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
    const [mintNFT, setMintNFT] = useState<any | "">("");
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
        console.log("close")
        setOpen(false);
        setOpenNetflix(false);
    };
    const handleCloseNetflix = () => {
        setOpenNetflix(false);
    };
    const handleCloseMint = () => {
        setOpenMint(false);
    };
    const handleMint = () => {
        console.log(months);
        // setOpenMint(true);
        setOpenBacklog(true);
        mintAccount('hiep', months).then((data: any) => {


            if (data != null ) {

                setOpenMint(true);
                setOpenBacklog(false);
                setMintNFT(data);
                axios.post('/route/createNFT',data)
                
            }

            // else if(data==""){

            // }


        })
        .catch((error:any) => {
            console.error(error.message);
           

          });
        
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
    const [active,setActive]=useState(false)

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

                            <Button className='account-button'  variant="contained" onClick={handleClose} autoFocus>
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
                            <Button  size="small" variant="outlined" onClick={function (event) { handleClose(); handleMint(); handleOpenBacklog() }}>Payment</Button>

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
                                <div className='alert-img'> <img className='alert-mintNFT-img' src="https://i.pinimg.com/236x/7e/56/77/7e56778e565d8f6f31bb744e10acb158.jpg" /></div>
                                {/* <div > {mintNFT.minter}<br /></div>
                                <div>  Token ID: {mintNFT.tokenId}<br /></div>
                                <div>  Expirationdate: {mintNFT.expirationDateTime}<br /> </div>
                                <div>Token URI:         <ContentCopyIcon onClick={Copy_NFT} /> </div> */}
                                <Grid container rowSpacing={1} columnSpacing={{}}>
                                    <Grid className='alert-title' item xs={5}>
                                        Minter Address:
                                    </Grid>
                                    <Grid item xs={7}>
                                        {/* {mintNFT.minter.substring(0, 10)}...{mintNFT.minter.substring(35)} */}
                                    </Grid>
                                    <Grid className='alert-title' item xs={5}>
                                        Token ID:
                                    </Grid>
                                    <Grid item xs={7}>
                                        {mintNFT.tokenId}
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
                                            {active ? <CheckIcon/> : <ContentCopyIcon />}
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