import React, { useState } from "react"
import "./Home.css"
import CssBaseline from '@mui/material/CssBaseline';
import Banner from "./Banner";
import Market from "./Market";
import product from "../../api/product.js";
import { CartProvider } from "react-use-cart";
const Home = ( handleAddProduct:any) => {
 
  return (<>
 
   <CartProvider>
     
     <Banner/>
  
     
     <Market />

     </CartProvider>
     
      
    
  
    </>
  );
};

export default Home;
