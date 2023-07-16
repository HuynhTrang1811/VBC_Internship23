import React, { useState } from 'react'
import './CardNFT.css'
import { useCart } from "react-use-cart"
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Popover, Typography } from '@mui/material';
const CartNFT = (item: any) => {
    const { removeItem, items } = useCart();
    const [openBuy, setOpenBuy] = useState(false)
    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
    const [anchorEl2, setAnchorEl2] = React.useState<HTMLElement | null>(null);
    const handleOpenBuy = () => {
        setOpenBuy(true);
    }
    const handleCloseBuy = () => {
        setOpenBuy(false);
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

    const open = Boolean(anchorEl);
    const openRemove = Boolean(anchorEl2);
    const OpenDialog = (icon: any) => {
        let title = "";
        console.log(icon.icon);
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
                            <form>
                                {/* Form BUy NFT  */}
                                <Dialog
                                    open={openBuy}
                                    onClose={handleCloseBuy}
                                    aria-labelledby="alert-dialog-title"
                                    aria-describedby="alert-dialog-description"
                                    id="alert"
                                >

                                    <DialogTitle id="alert-dialog-title">
                                        {"CONFIRM PAYMENT"}
                                    </DialogTitle>
                                    <DialogContent id="alert-dialog-content">
                                    <div className="item-cart-img"><img className='cart-img' src={item.img} /></div>
                <div className="item-info">
                    <div className='item-info-name'>{item.name}</div>
                    <div className="item-info-price">
                        Total Price:  {item.price}
                    </div>

                </div>
                                    </DialogContent>
                                    <DialogActions>

                                        <Button className='account-button' variant="contained" onClick={handleCloseBuy} autoFocus>
                                            Pay
                                        </Button>

                                    </DialogActions>

                                </Dialog>
                            </form>
                        </span>
                        <OpenDialog icon="buy" />

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