import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";
import Header from "./Header";


const Formorder = (props) => {
  const [order, setOrder] = useState({
    fullname: "",
    address: "",
    phone: "",
  });
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();

  const cart = JSON.parse(localStorage.getItem("cart-item"));

  const itemsPrice = cart.reduce((a, c) => a + c.price * c.qty, 0);

  const user = JSON.parse(localStorage.getItem('user'))

  const handleChange = (e) => {
    // console.log(e.target.value);

    setOrder({ ...order, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    } else {

      e.preventDefault();
      await axios.post('http://127.0.0.1:4000/order',
        { order, userid: user.userid, cart: cart, total: itemsPrice }
        ,
        { headers: { 'Content-Type': 'application/json' } }
      )
      localStorage.setItem("cart-item", JSON.stringify([]))

      // console.log("submit", order, { cart: cart }, { total: itemsPrice });

      await axios.put('http://127.0.0.1:4000/product/editqty',
        { cart: cart },
        { headers: { 'Content-Type': 'application/json' } })

      navigate("/")

    }
    setValidated(true);

  };
  // console.log(cart)
  return (
    <>
      <Header></Header>
      <Container>
        <Row>
          <Col className="bg-secondary item">

            <Form onSubmit={onSubmit} noValidate validated={validated}>
              <h1 className="text-center">Order</h1>
              <Form.Group >
                <Col className="m-2" sm={3}>
                  <Form.Label>FullName</Form.Label>
                  <Form.Control type="text" name="fullname" onChange={handleChange} required />
                  <Form.Control.Feedback type="invalid">
                    Please provide your Fullname.
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>
              <Form.Group>
                <Col className="m-2" sm={3}>
                  <Form.Label>Address</Form.Label>
                  <Form.Control as="textarea" type="text" name="address" onChange={handleChange} required />
                  <Form.Control.Feedback type="invalid">
                    Please provide your Address.
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>
              <Form.Group>
                <Col className="m-2" sm={3}>
                  <Form.Label>Phone</Form.Label>
                  <Form.Control type="tel" name="phone" onChange={handleChange} required />
                  <Form.Control.Feedback type="invalid">
                    Please provide your Phone.
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>

              <Col className="m-2" sm={3}>
                <p>Cart</p>
                <Table variant="dark" striped >
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>qty</th>
                      <th>price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map((x) => (
                      <tr key={x.productid}>
                        <td>{x.name}</td>
                        <td>{x.qty}</td>
                        <td>${x.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <p className="m-2">Total ${itemsPrice}</p>
              </Col>
              <Button className="m-2" variant="dark" type={"submit"}>Submit</Button >
            </Form>
            <Button className="m-2" variant="dark" href="/">Back</Button >
          </Col>
        </Row>
      </Container>
    </>

  );
};

export default Formorder;
