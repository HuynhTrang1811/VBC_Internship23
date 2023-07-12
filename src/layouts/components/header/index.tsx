import React, { useState, useEffect } from 'react';
import Button from '../button/Button';
import { Link } from 'react-router-dom';
import './Header.css';
import "../../../pages/home/Home.css"


import ConnectWallet from './ConnectWallet';
const Header = () => {

    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);
  
    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);
  
    const showButton = () => {
      if (window.innerWidth <= 960) {
        setButton(false);
      } else {
        setButton(true);
      }
    };
  
    useEffect(() => {
      showButton();
    }, []);
    window.addEventListener('resize', showButton);
    return (
        <>
            <nav className='navbar' >
                <div className='navbar-container' >
                    <div className='menu-icon' onClick={handleClick}>
                        <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                    </div>
                    <ul className={click ? 'nav-menu active' : 'nav-menu'}>

                        <Linkactive  onClick={closeMobileMenu} href="/">HOME</Linkactive>
                        <Linkactive  onClick={closeMobileMenu} href="/user">PROFILE</Linkactive>

                    </ul>
                    {button && <ConnectWallet />}
                </div>
            </nav>

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
