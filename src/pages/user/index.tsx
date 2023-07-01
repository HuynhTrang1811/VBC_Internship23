import React from "react"
import { Header } from "../../layouts/components";
import Footer from "../../layouts/components/footer/Footer";
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import  product  from "../../api/product.js";
import UserImg from "./UserImg";
import './User.css'
import UserInfo from "./UserInfo";
import { CartProvider } from "react-use-cart";
const User = (handleAddProduct:any) => {
  const items = product;
  
  return (<>


   <CartProvider>
     <UserImg/>
     <UserInfo />
   
     </CartProvider>
  </>
  );
};

export default User;
