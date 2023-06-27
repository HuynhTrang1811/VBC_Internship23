import React from "react"
import "./Home.css"
import CssBaseline from '@mui/material/CssBaseline';
import Banner from "./Banner";
import ListNFT from "./ListNFT";
const Home = () => {

  return (<>

    <React.Fragment>
      <CssBaseline />
      <div>
        <Banner />
        <ListNFT />
      </div>


    </React.Fragment>

  </>
  );
};

export default Home;
