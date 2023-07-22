import React, { useState, useEffect } from 'react';
import './Header.css';
import "../../../pages/home/Home.css"
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Drawer from '@mui/material/Drawer';
import CloseIcon from '@mui/icons-material/Close';
import ConnectWallet from './ConnectWallet';
import CartNFT from '../../../pages/user/NFT/CartNFT';
import { makeStyles } from '@material-ui/core/styles';
import { useCart } from "react-use-cart"
import { Alert, AlertProps, Button, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Checkbox from '@mui/material/Checkbox';
import { LinearProgress } from '@mui/material';
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
type Anchor = 'right';

const useStyles = makeStyles({
    drawerPaper: {
        borderRadius: '20px 20px 0 0',
    },
});
const Header = () => {
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });
    const { totalUniqueItems, items, removeItem } = useCart();
    const [selectedItems, setSelectedItems] = useState([String]); 
    const [openSuccess,setOpenSuccess]=useState(false)
    const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
        props,
        ref,
    ) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });


    const handleItemSelection = (itemId: never) => {
        // Hàm xử lý khi người dùng chọn hoặc bỏ chọn một mục
        if (selectedItems.includes(itemId)) {
            setSelectedItems(selectedItems.filter((id) => id !== itemId));
        } else {
            setSelectedItems([...selectedItems, itemId]);
        }
    };
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
        setOpenSuccess(false)
        setOpen(false);
    };
    const openCart = () => {
      
        setOpen(true);

    }
    const classes = useStyles();
    let total = 0;
    const handleCheckout = () => {

        selectedItems.map((itemremove: any) => {
            {/*
            set loading payment 
         */}

            removeItem(itemremove);
            {/*
            call transaction payment from contract
         */}
         setOpenSuccess(true)
            {/*
           call payment successfully
         */}




        })

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
                        <ShoppingCartIcon className='cart-icon' onClick={toggleDrawer('right', true)} fontSize="large" />
                        <div className="cart">
                            <Drawer

                                id="cart"
                                anchor={'right'}
                                open={state['right']}
                                onClose={toggleDrawer('right', false)}

                                classes={{ paper: classes.drawerPaper }}
                            >
                                <div className='open-cart'>
                                    <div className="cart-header" style={{ borderBottom: '0.5px solid black' }}>
                                        <h2 >My Cart</h2>
                                        <div className='header-icon'><CloseIcon onClick={toggleDrawer('right', false)} /></div>
                                    </div>

                                    <div className="cart-body">
                                        {!items.length ? <>
                                            <p className='empty-cart'>Your cart is currently empty.


                                            </p>

                                        </>
                                            :
                                            <div className='not-empty-cart'>{
                                                items.map((item: any) => {
                                                    total = total + item.price;
                                                    return (<>
                                                        <div className="cart-items">
                                                            <CartNFT
                                                                name={item.name}
                                                                price={item.price}
                                                                img={item.img}
                                                                time={item.expirationDateTime}
                                                                id={item.id}
                                                                isSelected={selectedItems.includes(item.id)}
                                                                onSelectItem={handleItemSelection}
                                                            />
                                                        </div>
                                                    </>
                                                    )
                                                })
                                            }
                                                <div className="cart-payment-actions">
                                                    <div className="cart-total-pay">
                                                        <p>Subtotal</p>
                                                        <p>${ }.00</p>
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
                                                        {/* <Snackbar open={openPayment} autoHideDuration={6000} >
                                        <Alert onClose={handleClosePayment} severity="success" sx={{ width: '100%' }}>
                                            Payment successfully !
                                        </Alert>
                                    </Snackbar> */}
                                                    </div>
                                                    <div className="cart-pay-button"><Button className='cart-action-pay' variant="outlined" onClick={handleCheckout}>Check out</Button>
                                                    </div>
                                                </div>

                                            </div>
                                        }
                                    </div>


                                </div>
                            </Drawer>
                        </div>

                        <p className='cart-total'>{totalUniqueItems}</p>

                    </div>





                </div >





            </nav >
            <Snackbar open={openSuccess} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Payment successfully !
                </Alert>
            </Snackbar>

        </>
    );
}
const Linkactive = (h: any) => {
    const path = window.location.pathname;
   
    return (
        <li>
            <a className={path === h.href ? "nav-links-active" : "nav-links"} href={h.href}>{h.children}</a>
        </li>
    )
};
export default Header;
