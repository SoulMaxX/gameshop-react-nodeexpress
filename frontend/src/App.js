import "./App.css";
import Header from "./components/Header";
import Main from "./components/Main";
import Basket from "./components/Basket";
import data from "./data";
import { useEffect, useState } from "react";
import axios from "axios";

  function App() {
  // const { products } = data;
  const [products, setProcuct] = useState([])
  useEffect(()=>{
    async function fetchData(){
      const res = await axios.get('http://localhost:4000/',);
      let products = res.data.recordset
      setProcuct(products)

      // console.log(products)
    }
    fetchData()
  },[])
  const [cartItems, setCartItem] = useState([]);
  const onAdd = (product) => {
    const exist = cartItems.find((x) => x.ProductId === product.ProductId);
    if (exist) {
      setCartItem(
        cartItems.map((x) =>
          x.ProductId === product.ProductId ? { ...exist, qty: exist.qty + 1 } : x
        )
      );
    } else {
      setCartItem([...cartItems, { ...product, qty: 1 }]);
    }
  };
  const onRemove = (product) => {
    const exist = cartItems.find((x) => x.ProductId === product.ProductId);
    if (exist.qty === 1) {
      setCartItem(cartItems.filter((x) => x.ProductId !== product.ProductId));

    } else {
      setCartItem(
        cartItems.map((x) =>
          x.ProductId === product.ProductId ? { ...exist, qty: exist.qty - 1 } : x
        )
      );
    }
  }

  const clear = () => setCartItem([])
  return (
    <div className="App">
      <Header countCartItems={cartItems.length}></Header>
      <div className="row">
        <Main onAdd={onAdd} products={products}></Main>
        <Basket onAdd={onAdd} onRemove={onRemove} clear={clear} cartItems={cartItems}></Basket>
      </div>
    </div>
  );
}

export default App;
