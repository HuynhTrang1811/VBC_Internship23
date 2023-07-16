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

const Header = () => {
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });
    const { totalUniqueItems,items } = useCart();

    const toggleDrawer =
        (anchor: Anchor, open: boolean) =>
            (event: React.KeyboardEvent | React.MouseEvent) => {
                if (
                    event.type === 'keydown' &&
                    ((event as React.KeyboardEvent).key === 'Tab' ||
                        (event as React.KeyboardEvent).key === 'Shift')
                ) {
                    return;
                }

                setState({ ...state, [anchor]: open });
            };
    const [click, setClick] = useState(false);
    const [open, setOpen] = useState(false);
    // const [close, setClose]= useState(true);
    const handleClose = () => {
        setOpen(false);
    };
    const openCart = () => {
        console.log("click")
        setOpen(true);

    }


    return (
        <>
            <nav className='navbar' >
                <div className='navbar-container' >

                    <ul className={click ? 'nav-menu active' : 'nav-menu'}>

                        <Linkactive href="/">HOME</Linkactive>
                        <Linkactive href="/user">PROFILE</Linkactive>


                    </ul>
                   
                    <ConnectWallet />
                    <div className="cart-header" onClick={openCart}>
                        <ShoppingCartIcon className='cart-icon'  onClick={toggleDrawer('right', true)} fontSize="large" />

                        <Drawer
                            anchor={'right'}
                            open={state['right']}
                            onClose={toggleDrawer('right', false)}
                        >
                            <div className='open-cart'>
                                <div className="cart-header">
                                    <h2>My Cart</h2>
                                    <div className='header-icon'><CloseIcon onClick={toggleDrawer('right', false)} /></div>
                                </div>
                                <div className="cart-body">
                                    {
                                        items.map((item: any) => {
                                            return (<>
                                                <div className="cart-items">
                                                    <CartNFT name={item.name} price={item.price} img={item.img} time={item.time_left} id={item.id} />
                                                </div>
                                            </>
                                            )
                                        })
                                    }
                                </div>

                            </div>
                        </Drawer>
                       
                    <p className='cart-total'>{totalUniqueItems}</p>

                    </div>
                    




                </div >





            </nav >

        </>
    );
}
const Linkactive = (h: any) => {
    const path = window.location.pathname;
    console.log(h.href, path)
    return (
        <li>
            <a className={path === h.href ? "nav-links-active" : "nav-links"} href={h.href}>{h.children}</a>
        </li>
    )
};
export default Header;
