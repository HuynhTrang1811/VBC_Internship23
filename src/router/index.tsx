import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/login"
import Home from "../pages/home";
import User from "../pages/user";
import NotFound from "../pages/notFound";
import GeneralRoutes from "./list/GeneralRoutes";
import { Header } from "../layouts/components";
import Footer from "../layouts/components/footer/Footer";
const RouterList = () => {
  return (<>
    <Header/>
    <Routes>
      {GeneralRoutes.map((item, idx) => (
        <Route key={idx} path={item.path} element={<item.element />} />
      ))}
      <Route path="/404" element={<NotFound />} />

      {/* Use if we have many role in system */}
      {/* <Route path="/user" element={<PrivateRoute roles={[ROLE.User]} />}>
        {UserRoutes.map((item, idx) => (
          <Route key={idx} path={item.path} element={<item.element />} />
        ))}
      </Route> */}
      {/* <Route path="*" element={<Login />} /> */}
    
      <Route path="*" element={<Home />} />
      <Route path="/user" element={<User />} />
    </Routes>
    <Footer/>
    </>
  );
};

export default RouterList;
