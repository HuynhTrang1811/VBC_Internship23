import React from 'react';
import Banner from './Banner';
import Market from './Market';
import { useEffect, useState } from 'react';
import { LoadingContextProvider } from '../loading';


const Home = () => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 5000)
  }, [])
  return (
    <> <LoadingContextProvider>
      <Banner />
      <Market />
      </LoadingContextProvider>

    </>
  )
}

export default Home