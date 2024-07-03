import logo from '../../logo.svg';
import './App.css';
import {Cart} from "./cart";
import {useCallback, useEffect, useState} from "react";
import {ItemsManager} from "./items";
import Buyable from "./buyable";

export function App() {

  const [cartItems, setCartItems] = useState([]);

  useEffect(() =>{
    setCartItems(ItemsManager.Singleton.getItems());
  }, [])

  const addToCart = useCallback(({name, id}) => {

    const item = {name, id};
    const newCartItems = [...cartItems, item];
    setCartItems(newCartItems);
    ItemsManager.Singleton.setItems(newCartItems)

  }, [setCartItems]);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          The Finfare T Shirt Online Store
        </p>
      </header>

      <Buyable id={'mens-shirt'} name={'Mens Shirt'} handleBuy={addToCart}>
        <p>A hefty manly man's shirt</p>
      </Buyable>

      <Buyable id={'womens-shirt'} name={'Womens Shirt'} handleBuy={addToCart}>
        <p>A hefty womanly woman's shirt</p>
      </Buyable>

      <Cart items={cartItems} />
    </div>
  );
}