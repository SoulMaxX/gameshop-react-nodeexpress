import React from "react";
import { Col, Container, Row, Stack } from "react-bootstrap";
import Product from "./Product";

const Main = (props) => {
    const { products, onAdd } = props;
    // console.log(products)
    return (
        <Container>
            <Row>
                    {/* <h2>Product</h2> */}

                    {products.map((product) => (
                        <Product key={product.productid} product={product} onAdd={onAdd}></Product>
                    ))}
                
            </Row>
        </Container>     
    )
}



export default Main