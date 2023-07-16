
import { BrowserRouter } from "react-router-dom";

import RouterList from "./router";
import { CartProvider } from 'react-use-cart';



function App() {
  return (
   
    <BrowserRouter>
     <CartProvider>
    <RouterList />
    </CartProvider>
  </BrowserRouter>
 
  );
}

export default App;
