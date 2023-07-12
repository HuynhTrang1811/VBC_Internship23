import React from 'react'
import { useState } from 'react';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import './CardNFT.css'
import { useCart } from "react-use-cart"
import Stack from '@mui/material/Stack';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const CartNFT = (item: any) => {
    const { removeItem, items } = useCart();
    return (

        <div className='card-product'>
             <div id="stars"></div>
      <div id="stars2"></div>
      <div id="stars3"></div>
            <div className="card-header">
                <CardMedia
                    id="card-img"
                    component="img"
                    alt="green iguana"
                    height="230"
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
                    {item.price}
                    {/* <img src="" style={{width:20,height:20}}/> */}
                </div>
            </div>
            <div className="card-buy" >
                <Stack>
                    <Button className="app-home-item-button-add" variant="contained" size="medium" onClick={() => { removeItem(item.id) }} >remove item</Button>
                </Stack>

                <Button className="app-home-item-button-buy" size="medium" variant="contained" >buy</Button>
            </div>
        </div>


    )
}

export default CartNFT