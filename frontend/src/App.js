import "./App.css";
import Header from "./components/Header";
import Main from "./components/Main";
import Basket from "./components/Basket";
import { useEffect, useState } from "react";
import axios from "axios";
import Footer from "./components/Footer";

function App() {
  // const { products } = data;
  const [products, setProcuct] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const res = await axios.get("http://localhost:4000/product");
      let products = res.data;
      setProcuct(products);

      // console.log(products)
    }
    fetchData();
  }, []);

  const [cartItems, setCartItem] = useState(() => {
    return JSON.parse(localStorage.getItem("cart-item"));
  }, []);

  if (!localStorage.getItem("cart-item")) {

    localStorage.setItem("cart-item", JSON.stringify([]))
  }

  useEffect(() => {
    localStorage.setItem("cart-item", JSON.stringify(cartItems));

  }, [cartItems]);


  const onAdd = (product) => {
    const item = cartItems.find((x) => x.qty === product.quantity);
    const exist = cartItems.find((x) => x.productid === product.productid);

    if (!item) {
      
      if (exist) {
        setCartItem(
          cartItems.map((x) =>
            x.productid === product.productid
              ? { ...exist, qty: exist.qty + 1 }
              : x
          )
        );
      } else {
        setCartItem([...cartItems, { ...product, qty: 1 }]);
      }
    }
  };
  const onRemove = (product) => {
    const exist = cartItems.find((x) => x.productid === product.productid);
    if (exist.qty === 1) {
      setCartItem(cartItems.filter((x) => x.productid !== product.productid));
    } else {
      setCartItem(
        cartItems.map((x) =>
          x.productid === product.productid
            ? { ...exist, qty: exist.qty - 1 }
            : x
        )
      );
    }
  };

  return (
    <div className="App">
      <Header countCartItems={cartItems.length}></Header>
      <div className="row">
        <Main onAdd={onAdd} products={products}></Main>
        <Basket
          onAdd={onAdd}
          onRemove={onRemove}
          cartItems={cartItems}
        ></Basket>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default App;
