import React from 'react'

import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import { useState } from "react";
import CartProvider from './store/CartProvider';

function App() {


  const [showcart, setshowcart] = useState(false);

  const showcartHadndle = ()=>{
    setshowcart(true);
  }
  const hidecartHadndle = ()=>{
    setshowcart(false);
  }




  return (
    
    <CartProvider>

      {showcart && <Cart onclose = {hidecartHadndle}/>}
      <Header onclick ={showcartHadndle}/>
      <Meals />
      
      </ CartProvider>
  );
}

export default App;
