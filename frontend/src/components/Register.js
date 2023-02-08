import axios from "axios";
import { useState } from "react"
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

const Register = () => {

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [email, setEmail] = useState();
    const [validated, setValidated] = useState(false);
    const navigate = useNavigate();

    // console.log(username, password, confirmPassword, email)
    const handlerRegister = async (e) => {
        const form = e.currentTarget;
        console.log(form.checkValidity())
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        } else {
            if (password === confirmPassword && password !== undefined) {
                
                await axios.post('http://127.0.0.1:4000/register',
                { username: username, password: password, confirmpassword: confirmPassword, email: email }
                ,
                { headers: { 'Content-Type': 'application/json' } }
                )
                navigate("/login")
                
                
            } else {
                alert('password not match')
            }
            setValidated(true);
        }
        
    }
    return (
        <>
            <Header></Header>
            <Container className="login bg-secondary">
                <Row>
                    <Col>

                        <h1>Register</h1>
                        <Form noValidate validated={validated}>
                            <Form.Group as={Row} className="login-form mb-3">
                                <Form.Label column sm="2">Username</Form.Label>
                                <Col sm="2">
                                    <Form.Control type={"text"} onChange={(e) => setUsername(e.target.value)} required></Form.Control>
                                    <Form.Control.Feedback type="invalid">
                                        Please provide Username.
                                    </Form.Control.Feedback>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="login-form mb-3">
                                <Form.Label column sm="2">Password</Form.Label>
                                <Col sm="2">
                                    <Form.Control type={"password"} onChange={(e) => setPassword(e.target.value)} required></Form.Control>
                                    <Form.Control.Feedback type="invalid">
                                        Please provide Password.
                                    </Form.Control.Feedback>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="login-form mb-3">
                                <Form.Label column sm="2">Confirm Password</Form.Label>
                                <Col sm="2">
                                    <Form.Control type={"password"} onChange={(e) => setConfirmPassword(e.target.value)} required></Form.Control>
                                    <Form.Control.Feedback type="invalid">
                                        Please provide Confirm Password.
                                    </Form.Control.Feedback>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="login-form mb-3">
                                <Form.Label column sm="2">Email</Form.Label>
                                <Col sm="2">
                                    <Form.Control type={'email'} onChange={(e) => setEmail(e.target.value)} required></Form.Control>
                                    <Form.Control.Feedback type="invalid">
                                        Please provide Email.
                                    </Form.Control.Feedback>
                                </Col>
                            </Form.Group>
                            <Button variant="dark" onClick={handlerRegister} type="button">Submit</Button>

                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Register