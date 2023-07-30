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
import { starRentNFT } from '../../contracts/nftRent';

import axios from "../../api"
import { getcurentWalletconnect } from '../../contracts/utils/getAbis';
import { socket } from '../../api/socket';

const CardItem = (item: any) => {
  const [open, setOpen] = useState(false);
  const { addItem, items } = useCart();
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
    console.log(item.item);
    const dataItem = item.item;
    const address = await getcurentWalletconnect();
    const data = {
      minter: dataItem.minter,
      price: dataItem.price,
      owner: address,
      tokenID: dataItem.tokenID
    }
    try {
      try {
        await buyNFT("NETFLIX", data.tokenID, data.price, address)
      } catch { }
      await axios.post('/route/changeOwner', data)
      console.log('buy successfully')
      emitUserEvent(data.minter);
    }
    catch {
      console.log('something went wrong')
    }
  }

  const handleRent = async () => {
    const dataItem = item.item;
    const data_change = {
      minter: dataItem.minter,
      price: dataItem.price,
      owner: await getcurentWalletconnect(),
      tokenID: dataItem.tokenID
    }
    const rent_data = {
      minter: dataItem.minter,
      renter: await getcurentWalletconnect(),
      name: dataItem.name,
      tokenID: dataItem.tokenID,
      startTime: Date.now(),
      endTime: Date.now() + item.duration_rent,
      rent_price: item.price_rent,
    }
    try {
      try {
        await starRentNFT("NETFLIX", rent_data.tokenID, data_change.owner)

      } catch { }
      await axios.post('/route/changeOwner', data_change)
      await axios.post('/route/rentlogNFT', rent_data)
      console.log('rent successfully')
      emitUserEvent(data_change.minter)
    }
    catch (err) {
      console.log('something went wrong', err)
    }
  }

  const emitUserEvent = (walletAddress: any) => {
    socket.emit('user', { walletAddress })
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
          {item.time}
        </div>
      </div>
      <div className="card-body">
        <div className="card-name">{item.name}</div>
        <div className="card-price">
          {item.status == 'onsale' ? item.price : item.price_rent}
          {/* <img src="" style={{width:20,height:20}}/> */}
        </div>
      </div>
      <div className="card-body">
        <div className="card-name">Status:</div>
        <div className="card-price">
          {item.status}
          {/* <img src="" style={{width:20,height:20}}/> */}
        </div>
      </div>
      {item.status == 'rent' && <div className="card-body">
        <div className="card-name">Rent duration:</div>
        <div className="card-price">
          {item.duration_rent}
          {/* <img src="" style={{width:20,height:20}}/> */}
        </div>
      </div>}
      <div className="card-buy" >
        <Stack>
          <Button className="app-home-item-button-add" variant="contained" size="medium" onClick={() => { handleClick(item) }} >add cart</Button>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
              Add to cart successfully !
            </Alert>
          </Snackbar>
        </Stack>

        <Button disabled={item.item.minter == item.address} className="app-home-item-button-buy" size="medium" variant="contained"
          onClick={item.status == 'onsale' ? handleBuy : handleRent} >{item.status == 'onsale' ? 'Buy' : 'Rent'}</Button>
      </div>
    </div>


  )
}
export default CardItem;


