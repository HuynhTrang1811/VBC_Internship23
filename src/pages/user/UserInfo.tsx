import React, { useState } from 'react'
import Grid from '@mui/material/Grid';
import { useCart } from 'react-use-cart';
import AddIcon from '@mui/icons-material/Add';
import CardItem from '../home/CardItem';
import CartNFT from './NFT/CartNFT';
import "../home/Cards.css"
const UserInfo = () => {
  const { isEmpty,
    items,
    totalItems,
    totalUniqueItems,
    updateItemQuantity,
    removeItem,
    emptyCart
  } = useCart();

  const [toggle, setToggle] = useState(1);


  const toggleTab = (index: any) => {
    setToggle(index)
  };


  return (<>


    <div className="app-user-function">

    

      <div className='bloc-tabs'>
        <div className={toggle === 1 ? "active-tabs" : "tabs"} onClick={() => toggleTab(1)}>
          <h4> OWNED</h4>
        </div>
        <div className={toggle === 2 ? "active-tabs" : "tabs"} onClick={() => toggleTab(2)}>
          <h4>  ON SALE</h4>
        </div>
        <div className={toggle === 3 ? "active-tabs" : "tabs"} onClick={() => toggleTab(3)}>
          <h4>MY CART</h4>
        </div>
      </div>
      <div className='content-tabs'>
        <div className={toggle === 1 ? "active-content" : "content"}>
          <Grid container spacing={{ xs: 2, md: 3 }} columns={24}>
           
          </Grid>

        </div>
        <div className={toggle === 2 ? "active-content" : "content"} >
          <Grid container spacing={{ xs: 2, md: 3 }} columns={24}>
           
          </Grid>

        </div>
        <div className={toggle === 3 ? "active-content" : "content"}>
        
          <Grid container spacing={{ xs: 2, md: 3 }} columns={24} >
            {
              items.map((item: any) => {
                return (<>
                  <Grid item xs={6} key={item.id} >
                    <CartNFT name={item.name} price={item.price} img={item.img} time={item.time_left} id={item.id} />
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
