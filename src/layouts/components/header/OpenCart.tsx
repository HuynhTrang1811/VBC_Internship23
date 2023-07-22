
import React, { useState, useEffect } from 'react';
import './Header.css';
import "../../../pages/home/Home.css"
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Drawer from '@mui/material/Drawer';
import CloseIcon from '@mui/icons-material/Close';
import ConnectWallet from './ConnectWallet';
import CartNFT from '../../../pages/user/NFT/CartNFT';
import { useCart } from 'react-use-cart';
import { Button, Grid } from '@mui/material';
import { Link, Route, Routes } from 'react-router-dom';
import Home from '../../../pages/home';
import User from '../../../pages/user';
type Anchor = 'right';
const OpenCart = (item:any,status:any) => {
   
    const { totalUniqueItems,items } = useCart();

    const [click, setClick] = useState(false);
    const [open, setOpen] = useState(false);
    // const [close, setClose]= useState(true);
    const handleClose = () => {
        setOpen(false);
    };
    const openCart = () => {
     
        setOpen(true);

    }


    return (
        <Drawer
            anchor={'right'}
            open={true}
            onClose={status}
        >
            <div className='open-cart'>
                <div className="cart-header">
                    <h2>My Cart</h2>
                    <div className='header-icon'><CloseIcon onClick={status} /></div>
                </div>
                <div className="cart-body">
                    {
                        items.map((item: any) => {
                            return (<>
                                <div className="cart-items">
                                    <CartNFT name={item.name} price={item.price} img={item.img} time={item.expirationDateTime} id={item.id} />
                                </div>
                            </>
                            )
                        })
                    }
                </div>

            </div>
        </Drawer>

    )
}

export default OpenCart