
import { BrowserRouter } from "react-router-dom";
import { LoadingContextProvider } from "./pages/loading";
import RouterList from "./router";
import { CartProvider } from 'react-use-cart';
import { useState } from "react";
import './index.css'


function App() {

  return (<>


    <BrowserRouter>
      <LoadingContextProvider>
        <CartProvider>

          <RouterList />

        </CartProvider>
      </LoadingContextProvider>
    </BrowserRouter>
  </>
  );
}

export default App;
