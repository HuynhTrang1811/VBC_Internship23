import React, { useState } from 'react'
import './CardNFT.css'
import { useCart } from "react-use-cart"
import DeleteIcon from '@mui/icons-material/Delete';
import { Popover, Typography } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const CartNFT = (item: any) => {
    const { removeItem } = useCart();
    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
    const [anchorEl2, setAnchorEl2] = React.useState<HTMLElement | null>(null);
    const handlePopoverOpenRemove = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl2(event.currentTarget);

    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
        setAnchorEl2(null);
    };

    const open = Boolean(anchorEl);
    const openRemove = Boolean(anchorEl2);
    const OpenDialog = () => {

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
                <Typography sx={{ p: 1 }}>Remove NFT</Typography>
            </Popover>
        </>)


    }
    return (
        <>

            <div className="item-cart">
                <input
                    type="checkbox"
                    checked={item.isSelected}
                    onChange={() => item.onSelectItem(item.id)}
                />
                <div className="item-cart-img"><img className='cart-img' src={item.img} /></div>
                <div className="item-info">
                    <div className='item-info-name'>{item.name}</div>
                    <div className="item-info-price">
                        Total Price:  {item.price}
                    </div>

                </div>
                <div className="item-footer">
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
                        <OpenDialog />

                    </div>


                </div>

            </div>

        </>

    )
}

export default CartNFT;