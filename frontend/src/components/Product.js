import React from "react";
import { Button, Card, Col, Container, Row, Stack } from "react-bootstrap";

const Product = (props) => {
  const { product, onAdd } = props;
  // console.log(product)


  return (
      <Col md={4}>
        <Card className="product p-2 m-2 bg-secondary">
          <Card.Img src={"http://127.0.0.1:4000/image/" + product.image} style={{ width: "200px", height: "200px" }} />
          <Card.Body>
            <Card.Title>{product.name}</Card.Title>
            <Card.Text>${product.price}</Card.Text>
            <Card.Text>{product.quantity > 0 ? product.quantity + " Item(s)" : "Sold Out"}</Card.Text>
            <Card.Text>{product.quantity <= 0 ? <Button variant="dark" disabled>Add To Cart</Button> : <Button variant="dark" onClick={() => onAdd(product)}>Add To Cart</Button>}</Card.Text>
          </Card.Body>


          {/* <div className="product-inner"> */}
          {/* <img src={"http://127.0.0.1:4000/image/" + product.image} style={{ width: "150px", height: "150px" }}></img>
    <h3>{product.name}</h3>
    <div>${product.price}</div>
    <div>{product.quantity !== 0 ? product.quantity + " Item(s)" : "Sold Out"} </div>
    <div>{product.quantity === 0 ? <Button variant="dark" disabled>Add To Cart</Button> : <Button variant="dark" onClick={() => onAdd(product)}>Add To Cart</Button>}
    </div> */}
          {/* </div> */}

        </Card>
      </Col>






  );
};

export default Product;
