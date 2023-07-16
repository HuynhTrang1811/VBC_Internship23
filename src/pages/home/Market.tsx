import React, { useEffect, useState } from 'react';
import './Cards.css';
import CardItem from './CardItem';
import { Grid } from '@mui/material';
import './Home.css'
import { useCart } from "react-use-cart"
import Skeleton from '@mui/material/Skeleton';
import CircularProgress from '@mui/material/CircularProgress';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
const Market = () => {

  const products = [
    { id: "1", name: "Terraform", img: "https://i.pinimg.com/236x/7e/56/77/7e56778e565d8f6f31bb744e10acb158.jpg", type: "Netflix", owner: "", time_left: "2d 3h", price: "0.05ETH" },
    { id: "2", name: "Terraform", img: "https://i.pinimg.com/236x/c0/17/fe/c017fea9b1df16e8c3f525238fd2cbab.jpg", type: "Netflix", owner: "", time_left: "2d 3h", price: "0.05ETH" },
    { id: "3", name: "Terraform", img: "https://i.pinimg.com/236x/ee/99/d6/ee99d6fedc69a859852620123c6291b5.jpg", type: "Netflix", owner: "", time_left: "2d 3h", price: "0.05ETH" },
    { id: "4", name: "Terraform", img: "https://i.pinimg.com/236x/fc/aa/f8/fcaaf823f6c25055122b63c4621fc0eb.jpg", type: "Netflix", owner: "", time_left: "2d 3h", price: "0.05ETH" },
    // { tokenID: "5", name: "Terraform", img: "https://openseauserdata.com/files/85230f10cbf4f9616c2eadb7121b6543.svg", type: "Netflix", owner: "", time_left: "2d 3h", price: "0.05ETH" },
    // { tokenID: "6", name: "Terraform", img: "https://openseauserdata.com/files/85230f10cbf4f9616c2eadb7121b6543.svg", type: "Netflix", owner: "", time_left: "2d 3h", price: "0.05ETH" },
    // { tokenID: "7", name: "Terraform", img: "https://openseauserdata.com/files/85230f10cbf4f9616c2eadb7121b6543.svg", type: "Netflix", owner: "", time_left: "2d 3h", price: "0.05ETH" },
    // { tokenID: "8", name: "Terraform", img: "https://openseauserdata.com/files/85230f10cbf4f9616c2eadb7121b6543.svg", type: "Netflix", owner: "", time_left: "2d 3h", price: "0.05ETH" },
    // { tokenID: "9", name: "Terraform", img: "https://openseauserdata.com/files/85230f10cbf4f9616c2eadb7121b6543.svg", type: "Netflix", owner: "", time_left: "2d 3h", price: "0.05ETH" },
  ];
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 1000)

  }, [])

  const ShowProduct = () => {
    return (<>

      <Grid container spacing={{ xs: 1, md: 2 }} columns={24}>
        {
          loading ? (<>

            <div className='loading-market'><CircularProgress disableShrink /></div>
          </>
          ) : products.map((product: any) => {
            return (<>

              <Grid item xs={6} key={product.id} >
                <CardItem id={product.id} item={product} name={product.name} price={product.price} img={product.img} time={product.time_left} />

              </Grid>

            </>
            )

          })}
      </Grid>


    </>)
  }

  return (
    <div className='app-market'>
      <div id="stars"></div>
      <div id="stars2"></div>
      <div id="stars3"></div>
      <div className="row">
        <div className="col-12">
          <h1 >ACCOUNTS</h1>

        </div>
        <div className='app-market-list'>

          {<ShowProduct />}

        </div>



      </div>
    </div>



  );
}

export default Market;
