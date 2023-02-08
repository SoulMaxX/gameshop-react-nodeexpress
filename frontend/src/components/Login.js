import { useState } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom"
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Header from "./Header";

const Login = () => {

    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [validated, setValidated] = useState(false);

    const navigate = useNavigate();
    // console.log(username, password)
    const handlerLogin = async (e) => {
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        } 
        setValidated(true);


            let result = await axios.post('http://127.0.0.1:4000/login',
                { username: username, password: password }
                ,
                { headers: { 'Content-Type': 'application/json' } }
            )
            // console.log(result)
            if (result.data.username) {
                localStorage.setItem('user', JSON.stringify(result.data))
                navigate("/")
            } else {
                alert('username or password incorrect')
            }

        
    }
    return (<>
        <Header></Header>
        <Container className="login bg-secondary">
            <Row>
                <Col>
                    <h1>Please Login</h1>
                    <Form noValidate validated={validated}>
                        <Form.Group as={Row} className="login-form mb-3">
                            <Col sm="2">
                                <Form.Control name="username" placeholder="Username" onChange={(e) => setUsername(e.target.value)} required></Form.Control>
                                <Form.Control.Feedback type="invalid">
                                    Please provide Username.
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="login-form mb-3">
                            <Col sm="2">
                                <Form.Control name="password" placeholder="Password" type='password' onChange={(e) => setPassword(e.target.value)} required></Form.Control>
                                <Form.Control.Feedback type="invalid">
                                    Please provide Password.
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>
                        <Button variant="dark m-2" onClick={handlerLogin} type="button">Login</Button>
                    </Form>
                    <Button href="/register" variant="dark">Register</Button>
                </Col>
            </Row>
        </Container>
    </>

    )
}

export default Login