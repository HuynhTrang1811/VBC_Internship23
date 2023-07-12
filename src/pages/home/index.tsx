import React from 'react';
import Banner from './Banner';
import Market from './Market';
import { useEffect, useState } from 'react';


const Home = () => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 5000)
  }, [])
  return (
    <>
      {/* {
        loading ? 
        <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>:
      <>
        <Banner/>
         <Market/>
        </>
      } */}
       <Banner/>
         <Market/>

    </>
  )
}

export default Home