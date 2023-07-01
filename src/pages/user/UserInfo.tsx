import React, { useState } from 'react'
import Grid from '@mui/material/Grid';
import product from '../../api/product.js';
import userData from '../../api/userData';
import "./UserInfo.css"
import { SellNFT } from './NFT/SellNFT';
import { useCart } from 'react-use-cart';
import CartNFT from './NFT/CartNFT';
import { UseNFT } from './NFT/UseNFT';
import AddIcon from '@mui/icons-material/Add';
const UserInfo = () => {
  const { isEmpty,
    items,
    totalItems,
    totalUniqueItems,
    updateItemQuantity,
    removeItem,
    emptyCart
  } = useCart();
  let sellNFT=userData.userSellNFT;
  let useNFT=userData.userUseNFT;
  const [toggle, setToggle] = useState(1);


  const toggleTab = (index: any) => {
    setToggle(index)
  };


  return (<>


    <div className="app-user-function">



      <div className='bloc-tabs'>
        <div className={toggle === 1 ? "active-tabs" : "tabs"} onClick={() => toggleTab(1)}>
          <h4> SELLING NFTs</h4>
        </div>
        <div className={toggle === 2 ? "active-tabs" : "tabs"} onClick={() => toggleTab(2)}>
          <h4>  USING NFTs</h4>
        </div>
        <div className={toggle === 3 ? "active-tabs" : "tabs"} onClick={() => toggleTab(3)}>
          <h4>MY CART</h4>
        </div>
      </div>
      <div className='content-tabs'>
        <div className={toggle === 1 ? "active-content" : "content"}>
          <Grid container spacing={{ xs: 2, md: 3 }} columns={24}>
            {
              sellNFT.map((itemnft: any) => ((
                product.productData.map((item: any) => {
                
                  if (item.id === itemnft.id) {
                    return (<>
                      <Grid item xs={6} key={itemnft.id}  >
                        <SellNFT name={item.name} price={item.price} img={item.img} time={item.time} key={item.id} />
                      </Grid>
                    </>
                    )
                  }
                })))
                )}
          </Grid>

        </div>
        <div className={toggle === 2 ? "active-content" : "content"} >
          <Grid container spacing={{ xs: 2, md: 3 }} columns={24}>
            {
              useNFT.map((itemnft: any) => ((
                product.productData.map((item: any) => {
                  if (item.id === itemnft.id) {
                    return (<>
                      <Grid item xs={6} key={itemnft.id} >
                        <UseNFT    name={item.name} price={item.price} img={item.img} time={item.time} key={item.id} />
                      </Grid>
                    </>
                    )
                  }
                }))))}
          </Grid>

        </div>
        <div className={toggle === 3 ? "active-content" : "content"}>
        
          <Grid container spacing={{ xs: 2, md: 3 }} columns={24} >
            {
              items.map((item: any) => {
                return (<>
                  <Grid item xs={6} key={item.id} >
                    <CartNFT name={item.name} price={item.price} img={item.img} time={item.time} id={item.id} />
                  </Grid>
                </>
                )
              })
            }
          </Grid>
        </div>
      </div>

    </div>



  </>
  )
}
export default UserInfo;
