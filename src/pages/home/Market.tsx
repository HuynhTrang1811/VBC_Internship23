import React, { useEffect, useState } from 'react';
import './Cards.css';
import CardItem from './CardItem';
import { Grid } from '@mui/material';
import './Home.css'
import CircularProgress from '@mui/material/CircularProgress';
import axios from "../../api"
import { getcurentWalletconnect } from '../../contracts/utils/getAbis';
import { socket } from '../../api/socket';
import { useGlobalContext } from '../../store/GlobalContext';
const Market = () => {
  interface Product {
    id: string;
    name: string;
    img: string;
    type: string;
    owner: string;
    time_left: string;
    price: string;
    tokenID: string;
  }
  const [sellNFT, setSellNFT] = useState<Product[]>([]);
  const [rentNFT, setRentNFT] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [update, setUpdate] = useState(true);
  const [address, setAddress] = useState("");
  const { state, dispatch } = useGlobalContext();

  useEffect(() => {
    const foo = async () => {
      const x = await getcurentWalletconnect();
      setAddress(x);
      socket.emit("connection", { walletAddress: x })
    }
    foo();
    setTimeout(() => {
      setLoading(false)
    }, 1000)
    socket.on("update", () => {
      console.log("update received");
      dispatch({ type: "SET_UPDATE_MAIN", payload: !state.update_main });
    })
    axios.get('/route/getRentNFT')
      .then((res) => {
        setRentNFT(res.data)
        console.log(res.data)

      })
      .catch(error => console.log(error))
    axios.get('/route/getSellNFT')
      .then((res) => {
        setSellNFT(res.data)
        console.log(res.data)

      })
      .catch(error => console.log(error))
    return () => {
      socket.off("update");
    }
  }, [state])
  const NFT = sellNFT.concat(rentNFT);
  const ShowProduct = () => {
    return (<>

      <Grid container spacing={{ xs: 1, md: 2 }} columns={24}>
        {
          loading ? (<>

            <div className='loading-market'><CircularProgress disableShrink /></div>
          </>
          ) : (NFT.map((product: any) => {
            return (<>

              <Grid item xs={6} key={product.id} >
                <CardItem address={address} update={update} setUpdate={setUpdate} id={product._id} item={product} name={product.name} price={product.price} img={product.img} time={product.time_left} status={product.status} price_rent={product.price_rent} duration_rent={product.duration_rent} minter={product.minter} />

              </Grid>

            </>
            )

          })

          )

        }
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
