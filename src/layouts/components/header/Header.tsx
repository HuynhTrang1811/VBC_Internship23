import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import ButtonConnect from './Button';
import "./Header.css"

const Header = () => {
 
  return (
    <>

      <div className="app-header">
        <div className="app-header-1 justify-between">
          <Link href="/" >HOME</Link>
          <Link href="/user" >PROFILE</Link>
        </div>
        <div className='app-header-2'>
          <Stack direction="row" spacing={3}>
            {/* <div className='app-header-2'> */}
            {/* <Button variant="contained" sx={{ minWidth: 200, maxWidth: 250, height: 2 / 3, color: 130841 }} >Connect Wallet</Button> */}
            <ButtonConnect/>
            {/* <a href="/user"><Avatar src="/broken-image.jpg" /></a> */}
          </Stack>
        </div>

      </div>


    </>
  );
};
const Link = (h: any) => {
  const path = window.location.pathname;
  
  return (
    <li>
      <a className={path === h.href ? "active" : ""} href={h.href}>{h.children}</a>
    </li>
  )


};

export default Header;
