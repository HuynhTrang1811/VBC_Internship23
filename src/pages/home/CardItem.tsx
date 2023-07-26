import React from 'react'
import { useState } from 'react';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import './Home.css'
import { useCart } from "react-use-cart"
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { buyNFT } from '../../contracts/nftList';

import axios from "../../api"
import { getcurentWalletconnect } from '../../contracts/utils/getAbis';

const CardItem = (item: any) => {
  const [open, setOpen] = useState(false);
  const { addItem ,items} = useCart();
  const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });



  const handleClick = (item: any) => {
     
    setOpen(true);
    addItem(item);
   
   

   
  };

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
   
    setOpen(false);
  };
  
  const handleBuy = async () => {
   
    const dataItem = item.item;
    const data = {
      minter: dataItem.minter,
      price: dataItem.price,
      owner: await getcurentWalletconnect(),
      tokenID: dataItem.tokenID
    }
    try {
      await buyNFT("NETFLIX", data.tokenID, data.price)
      await  axios.post('/route/changeOwner', data)
      console.log('buy successfully')
    }
    catch {
      console.log('something went wrong')
    }
  }

  return (

    <div className='card-product'>
      <div className="card-header">
        <CardMedia
          id="card-img"
          component="img"
          alt="green iguana"
          height="180"
          image={item.img}
          sx={{
            transition: "all 0.2s ease",
            "&:hover": {
              transform: "scale3d(1.05, 1.05, 1.1)"
            }
          }}
        />
        <div className='time-left'>
          {item.status.toUpperCase()}
        </div>
      </div>
      <div className="card-body">
        <div className="card-name">{item.name}</div>
        <div className="card-price">
          {item.price}
          {/* <img src="" style={{width:20,height:20}}/> */}
        </div>
      </div>
      <div className="card-body">
        <div className="card-name">Time:</div>
        <div className="card-price">
          {item.time}
          {/* <img src="" style={{width:20,height:20}}/> */}
        </div>
      </div>
      <div className="card-buy" >
        <Stack>
          <Button className="app-home-item-button-add" variant="contained" size="medium" onClick={() => { handleClick(item) }} >add cart</Button>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
              Add to cart successfully !
            </Alert>
          </Snackbar>
        </Stack>

        <Button disabled={item.item.minter == item.address} className="app-home-item-button-buy"  size="medium" variant="contained" onClick={handleBuy} >buy</Button>
      </div>
    </div>


  )
}
export default CardItem;


