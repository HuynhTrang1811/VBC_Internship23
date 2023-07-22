import React, { useState } from 'react'
import './CardNFT.css'
import { useCart } from "react-use-cart"
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Popover, Typography } from '@mui/material';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Checkbox from '@mui/material/Checkbox';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const Alert = (item:any) => {
    const [open,setOpen]=useState(item.openBuy);
    const handleClose=()=>{
        setOpen(false);
    }
  return (
    <>
     <Dialog
                            open={item.openBuy}
                            onClose={handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                            id="alert"
                        >

                            <DialogTitle id="alert-dialog-title">
                                {item.title}
                            </DialogTitle>
                            <DialogContent id="alert-dialog-content">
                                <div className='payment-card'>
                                    <div className="item-cart-payment-img"><img className='cart-payment-img' src={item.img} /></div>
                                    <div className="item-info">
                                        <div className='item-info-payment-name'>{item.name}</div>
                                        <div className="item-info-price">
                                            Total Price:  {item.price}
                                        </div>

                                    </div>
                                </div>
                                <div className="payment-method">
                                    <div className='item-payment'>Payment method</div>
                                    <div className="payment-option">

                                        <Checkbox
                                            {...label}
                                            icon={<CheckCircleOutlineIcon />}
                                            checkedIcon={<CheckCircleRoundedIcon />}
                                        />
                                        <img id="eth-img" src="https://i.pinimg.com/564x/1b/9f/c2/1b9fc2f3a48868013b251accf905c205.jpg" />
                                        <p>Cryto</p>
                                    </div>
                                </div>
                            </DialogContent>
                            <DialogActions>

                                <Button className='account-button' variant="contained" onClick={handleClose} autoFocus>
                                    Pay

                                </Button>


                            </DialogActions>

                        </Dialog>
    </>
  )
}

export default Alert