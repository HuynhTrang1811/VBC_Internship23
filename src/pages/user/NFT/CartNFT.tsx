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

const CartNFT = (item: any) => {
    const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
        props,
        ref,
    ) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const { removeItem } = useCart();
    const [openPayment, setOpenPayment] = useState(false);
    const [openBuy, setOpenBuy] = useState(false)
    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
    const [anchorEl2, setAnchorEl2] = React.useState<HTMLElement | null>(null);
    const handleOpenBuy = () => {
        setAnchorEl(null);
        setOpenBuy(true);
    }
    const handleCloseBuy = () => {
        console.log("clickpayment")
       
        setOpenPayment(true);
        setOpenBuy(false);
        removeItem(item.id);
        console.log("remove")




    }
    const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);

    };
    const handlePopoverOpenRemove = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl2(event.currentTarget);

    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
        setAnchorEl2(null);
    };
    const handleClose = () => {

        setOpenBuy(false)


    };
    const handleClosePayment = () => {

        setOpenPayment(false)


    };
    const open = Boolean(anchorEl);
    const openRemove = Boolean(anchorEl2);
    const OpenDialog = (icon: any) => {
        let title = "";
        if (icon.icon == "buy") {
            title = "Checkout now !";
            return (<>
                <Popover
                    id="mouse-over-popover"
                    sx={{
                        pointerEvents: 'none',
                    }}
                    open={open}
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    onClose={handlePopoverClose}
                    disableRestoreFocus
                >
                    <Typography sx={{ p: 1 }}>{title}</Typography>
                </Popover>
            </>)
        } else {
            title = "Remove Item";
            return (<>
                <Popover
                    id="mouse-over-popover"
                    sx={{
                        pointerEvents: 'none',
                    }}
                    open={openRemove}
                    anchorEl={anchorEl2}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    onClose={handlePopoverClose}
                    disableRestoreFocus
                >
                    <Typography sx={{ p: 1 }}>{title}</Typography>
                </Popover>
            </>)
        }

    }

    return (
        <>
            <div className="item-cart">
                <div className="item-cart-img"><img className='cart-img' src={item.img} /></div>
                <div className="item-info">
                    <div className='item-info-name'>{item.name}</div>
                    <div className="item-info-price">
                        Total Price:  {item.price}
                    </div>

                </div>
                <div className="item-footer">

                    <div className='item-buy'>
                        <span aria-owns={open ? 'mouse-over-popover' : undefined}
                            aria-haspopup="true"
                            onMouseEnter={handlePopoverOpen}
                            onMouseLeave={handlePopoverClose}>
                            < ShoppingCartCheckoutIcon
                                sx={{
                                    size: '30px', '&:hover': {
                                        color: "green",
                                    },
                                }}

                                fontSize="large"
                                onClick={handleOpenBuy}
                            />
                            <OpenDialog icon="buy" />

                        </span>
                        <Dialog
                            open={openBuy}
                            onClose={handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                            id="alert"
                        >

                            <DialogTitle id="alert-dialog-title">
                                {"CONFIRM PAYMENT"}
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

                                <Button className='account-button' variant="contained" onClick= {handleCloseBuy} autoFocus>
                                    Pay

                                </Button>


                            </DialogActions>

                        </Dialog>
                        <Snackbar open={openPayment} autoHideDuration={6000} onClose={handleClosePayment}>
                            <Alert onClose={handleClosePayment} severity="success" sx={{ width: '100%' }}>
                                Payment successfully !
                            </Alert>
                        </Snackbar>



                    </div>

                    <div className='item-remove'>
                        <span aria-owns={open ? 'mouse-over-popover' : undefined}
                            aria-haspopup="true"
                            onMouseEnter={handlePopoverOpenRemove}
                            onMouseLeave={handlePopoverClose}>
                            <DeleteIcon sx={{
                                size: '30px', '&:hover': {
                                    color: "red",

                                },
                            }} fontSize="large" onClick={() => { removeItem(item.id) }} />
                        </span>
                        <OpenDialog icon="remove" />

                    </div>


                </div>
            </div>
        </>

    )
}

export default CartNFT;