import "./App.css";
import Header from "./components/Header";
import Main from "./components/Main";
import Basket from "./components/Basket";
import { useEffect, useState } from "react";
import axios from "axios";
import Footer from "./components/Footer";
import { Col, Container, Row } from "react-bootstrap";

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
    const item = cartItems.find((x) => x.qty === product.quantity && x.productid === product.productid);
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
    <>
      <Header countCartItems={cartItems.length}></Header>
      <Container className="App">

        <Row>

          <Col md={8} >
            <Main onAdd={onAdd} products={products}></Main>
          </Col>
          <Col md={4}>
            <Basket
              onAdd={onAdd}
              onRemove={onRemove}
              cartItems={cartItems}
            ></Basket>
          </Col>
        </Row>
      </Container>
      <Footer></Footer>
    </>

  );
}

export default App;
