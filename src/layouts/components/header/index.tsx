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
