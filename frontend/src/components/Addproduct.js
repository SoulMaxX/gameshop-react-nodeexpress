import axios from "axios"
import { useState } from "react"
import { Button, Col, Container, Form, Row } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import Header from "./Header"

const Addproduct = () => {
    const navigate = useNavigate()
    const [product, setProduct] = useState({
        name: "",
        price: "",
        quantity: ""
    })
    const [file, setFile] = useState({})
    const [imagePre, setImagePre] = useState(null)
    const [validated, setValidated] = useState(false);

    const user = JSON.parse(localStorage.getItem("user")).lv

    const handleChange = (e) => {
        // console.log(e.target.value)
        
        setProduct({ ...product, [e.target.name]: e.target.value })
    }

    const handleUpload = (e) => {
        // console.log(e.target.files[0].name)

        if (e.target.files[0]) {

            const file = e.target.files[0]
            const reader = new FileReader()
            reader.onloadend = () => {
                setFile(file)
                setImagePre(reader.result)
            }
            reader.readAsDataURL(file)
        }

    }
    const onSubmit = async (e) => {
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        } 
        setValidated(true)
            // console.log(product.name)
        if(product.name != "" && product.price != "" && product.quantity != "" && imagePre != null){
            e.preventDefault();
            await axios.post('http://127.0.0.1:4000/product/create', { name: product.name, price: product.price, quantity: product.quantity, image: file.name, user: user },
                { headers: { 'Content-Type': 'application/json' } })

            const formData = new FormData()
            formData.append('file', file)
            const uploadIma = await axios.post('http://127.0.0.1:4000/upload', formData)

            navigate("/admin")

            
        }

    }
    // console.log(file.name)



    return <>
        <Header></Header>
        <Container>
            <Row>
                <Col className={"bg-secondary item"}>

                    <h1 className="text-center">Add Product</h1>
                    <Form onSubmit={onSubmit} noValidate validated={validated} >
                        <Form.Group className="m-2">
                            <Col sm={3}>
                                <Form.Label>Product Name :</Form.Label>
                                <Form.Control type="text" name="name" onChange={handleChange} required></Form.Control>
                                <Form.Control.Feedback type="invalid">
                                    Please provide Product Name.
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>
                        <Form.Group className="m-2">
                            <Col sm={3}>
                                <Form.Label>Price :</Form.Label>
                                <Form.Control type="number" name="price" onChange={handleChange} required></Form.Control>
                                <Form.Control.Feedback type="invalid">
                                    Please provide Product Price.
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>
                        <Form.Group className="m-2">
                            <Col sm={3}>
                                <Form.Label>Quantity :</Form.Label>
                                <Form.Control type="number" name="quantity" onChange={handleChange} required></Form.Control>
                                <Form.Control.Feedback type="invalid">
                                    Please provide Product Quantity.
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>
                        <Form.Group className="m-2">
                            <Col sm={3}>
                                <img src={imagePre} style={{ width: "200px", height: "200px" }}></img>
                                <br></br>
                                <Form.Label>Image Product :</Form.Label>
                                <Form.Control onChange={handleUpload} type="file" required />
                                <Form.Control.Feedback type="invalid">
                                    Please Choose Image Product.
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>
                        <Button className="m-3" variant="dark" type={"submit"}>Submit</Button>
                    </Form>
                    <Button className="m-3" variant="dark" href="/admin">Back</Button>
                </Col>
            </Row>
        </Container>
    </>
}
export default Addproduct