import React, { useState,useEffect } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import Home from "../pages/home";
import User from "../pages/user";
import Header from "../layouts/components/header";
import Footer from "../layouts/components/footer";
import { Route, Routes, useLocation } from "react-router-dom";
import Backdrop from '@mui/material/Backdrop';
const RouterList = () => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const handleClose=()=>{
    setLoading(false)
  }
  useEffect(() => {
    setLoading(true); // Bắt đầu hiệu ứng loading khi người dùng chuyển trang
    setTimeout(() => {
      setLoading(false); // Kết thúc hiệu ứng loading sau 2 giây
    }, 1000);
  }, [location.pathname]); // Sử dụng useEffect để theo dõi thay đổi trang, chỉ chạy khi địa chỉ URL thay đổi

  return (<>
    {loading ?<>
      {/* <CircularProgress className="loading" color="inherit" /> */}
      <Backdrop
                        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
                        open={loading}
                        onClick={handleClose}
                    >
                        <CircularProgress color="inherit" />
                    </Backdrop>
    </>:<>
    <Header/>
    <Routes>
     
      <Route path="*" element={<Home/>} />
      <Route path="/user" element={<User/>} />
      <Route path="/cart" element={<Home/>} />
   
    </Routes>
    <Footer/>
    </>

    }
    
     
    </>
  );
};

export default RouterList;


