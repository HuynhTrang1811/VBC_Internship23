
import './Home.css'
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import axios from 'axios';
import { mintAccount } from '../../contracts/accountMint';
const Banner = () => {
    const [open, setOpen] = useState(false);
    const [months, setMonths] = useState(0);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleMint = () => {
        console.log(months);
        mintAccount('hiep', months )
    };

    return (
        <>
            <div className="app-home-banner flex flex-col md: flex-row w-4/5 justify-between items-center mx-auto py-10">
                <div className="app-home-banner-left">
                    <div className="app-home-banner-title">
                        <h1>Buy and Sell,<br /> Create Your NFT</h1>
                        <p className="banner-title">Digital Marketplace for your accounts.</p>
                    </div>
                    <div className="app-home-banner-divbutton">
                        <Button className="app-home-banner-button" variant="contained" onClick={handleClickOpen}>Buy Netflix NFT</Button>
                        <form>
                        <Dialog
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id="alert-dialog-title">
                                {"Buy Netflix Account NFT"}
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                 Enter number of month: <input type="text" onChange={(e) => {
                                    setMonths( +e.target.value);
                                 }} className='app-banner-form-input'></input>
                                  {/* <input></input> */}
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleMint}>Payment</Button>
                                <Button onClick={handleClose} autoFocus>
                                  Close
                                </Button>
                            </DialogActions>
                        </Dialog>
                        </form>
                        
                    </div>
                </div>
                <div className="app-home-banner-right">

                    <Grid container spacing={5} columns={18}>
                        <Grid item xs={6}>

                            <Card sx={{ maxWidth: 400, maxHeight: 250 }}>
                                <CardMedia
                                    component="img"
                                    alt="green iguana"
                                    height="160"
                                    image="https://i.pinimg.com/564x/fa/cb/55/facb55546b25323d576cbb8cf83585ee.jpg"
                                />


                            </Card>

                        </Grid>
                        <Grid item xs={6}>
                            <Card sx={{ maxWidth: 400, maxHeight: 250 }}>
                                <CardMedia
                                    component="img"
                                    alt="green iguana"
                                    height="200"
                                    image="https://i.pinimg.com/236x/eb/aa/44/ebaa441df578a3e48e26ef1a15a04e3c.jpg"
                                />


                            </Card>

                        </Grid>
                        <Grid item xs={6}>

                            <Card sx={{ maxWidth: 400, maxHeight: 250 }}>
                                <CardMedia
                                    component="img"
                                    alt="green iguana"
                                    height="160"
                                    image="https://i.pinimg.com/236x/8b/02/00/8b020050690f955ccb306cdf51324aea.jpg"
                                />

                            </Card>

                        </Grid>
                    </Grid>



                </div>
            </div >
        </>
    )

}
export default Banner;