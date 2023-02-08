import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Basket = (props) => {
  const { cartItems, onAdd, onRemove } = props;
  const itemsPrice = cartItems.reduce((a, c) => a + c.price * c.qty, 0);
  const shippingPrice = itemsPrice > 20000 ? 0 : 10;
  const totalPrice = itemsPrice + shippingPrice;
  const navigate = useNavigate();
  const checkout = () => {
    if (!localStorage.getItem('user')) {
      navigate('/login')
    } else {
      navigate('/formorder')
    }
  }
  return (
    
      <Container className="bg-secondary basket ">
      <h2>Cart Items</h2>
        
          {cartItems.length === 0 && <div> Cart Is Empty</div>}
          {cartItems.map((item) => (
            <Row className="m-2" key={item.productid}>
              <Col md={3} className="text-start" > {item.name}</Col>
              <Col md={4} className="text-center" >
                {item.quantity === item.qty ? <Button className="button-basket m-2" variant="dark" disabled>+</Button> : <Button className="button-basket m-2"  variant="dark" onClick={() => onAdd(item)}>+</Button>}
                <Button className="button-basket m-2" variant="dark" onClick={() => onRemove(item)}>-</Button>
              </Col>
              <Col md={5} className="text-end">{item.qty} x ${item.price.toFixed(2)}</Col>
            </Row>
          ))}
          {cartItems.length !== 0 && (
            <Container>
              <hr></hr>
              <Row >
                <Col className="text-start">
                  ItemsPrice:
                </Col>
                <Col className="text-end">
                  <div >${itemsPrice.toFixed(2)}</div>
                </Col>
              </Row>
              <Row >
                <Col className="text-start">
                  ShippingPrice:
                </Col>
                <Col className="text-end">
                  ${shippingPrice.toFixed(2)}
                </Col>
              </Row>
              <Row >
                <Col className="text-start">
                  TotalPrice:
                </Col>
                <Col className="text-end">
                  ${totalPrice.toFixed(2)}
                </Col>
              </Row>
              <hr></hr>
              <div>
                <Button variant="dark" onClick={checkout}>Check out</Button>
              </div>
            </Container>
          )}
        
      </Container>
    
  );
};

export default Basket;
