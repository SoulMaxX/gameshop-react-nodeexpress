import axios from "axios"
import { useEffect, useState } from "react"
import { Button, Col, Container, Form, Row } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import Popupdelete from "./Popupdelete"

const FormeditProduct = () => {
    // const [oldproduct,setOldproduct]= useState([])
    const navigate = useNavigate()
    const [popup, setPopup] = useState(false)
    const [product, setProduct] = useState({
        name: "",
        price: "",
        quantity: ""
    })
    const [file, setFile] = useState({})
    const [imagePre, setImagePre] = useState(null)
    const [validated, setValidated] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            const productid = JSON.parse(localStorage.getItem('product'))
            const result = await axios.get('http://localhost:4000/product/find', { params: { productid: productid } })
            const data = result.data
            setProduct(data)
            // console.log(data)
        }
        fetchData()
    }, [])
    // console.log(oldproduct)

    const handleChange = (e) => {
        // console.log(e.target.value)

        setProduct({ ...product, [e.target.name]: e.target.value })
    }
    // console.log(product)
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

        if (product.name != "" && product.price != "" && product.quantity != "") {
            e.preventDefault();
            const productid = JSON.parse(localStorage.getItem('product'))
            await axios.put('http://127.0.0.1:4000/product/edit', { name: product.name, price: product.price, quantity: product.quantity, image: file.name }, { params: { productid: productid } },
                { headers: { 'Content-Type': 'application/json' } })

            const formData = new FormData()
            formData.append('file', file)
            const uploadIma = await axios.post('http://127.0.0.1:4000/upload', formData)

            navigate("/editproduct")

        }
    }


    return <>
        <Container>
            <Row>
                <Col className="bg-secondary item">

                    <h1 className="text-center">Edit Product Id: {product.productid}</h1>
                    <Form onSubmit={onSubmit} noValidate validated={validated}>
                        <Form.Group>
                            <Col sm={3}>
                                <Form.Label>Product Name :</Form.Label>
                                <Form.Control type="text" name="name" onChange={handleChange} value={product.name} required></Form.Control>
                                <Form.Control.Feedback type="invalid">
                                    Please provide Product Name.
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>
                        <Form.Group>
                            <Col sm={3}>
                                <Form.Label>Price :</Form.Label>
                                <Form.Control type="number" name="price" onChange={handleChange} value={product.price} required></Form.Control>
                                <Form.Control.Feedback type="invalid">
                                    Please provide Product Price.
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>
                        <Form.Group>
                            <Col sm={3}>
                                <Form.Label>Quantity :</Form.Label>
                                <Form.Control type="number" name="quantity" onChange={handleChange} value={product.quantity} required></Form.Control>
                                <Form.Control.Feedback type="invalid">
                                    Please provide Product Quantity.
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>
                        <Form.Group>
                            <Col sm={3}>

                                {product.image ? <img src={imagePre ? imagePre : "http://127.0.0.1:4000/image/" + product.image} style={{ width: "200px", height: "200px" }}></img> : ''}
                                <br></br>
                                <Form.Label>Image Product :</Form.Label>
                                <Form.Control onChange={handleUpload} type="file" />
                            </Col>
                        </Form.Group>
                        <Button className="m-2" variant="dark" type={"submit"}>Submit</Button>
                    </Form>
                    <div>
                        <Button className="m-2" variant="dark" onClick={() => setPopup(true)}>Delete</Button>
                        <Popupdelete trigger={popup} setTrigger={setPopup}></Popupdelete>
                    </div>
                    <Button className="m-2" variant="dark" href="/editproduct">Back</Button>
                </Col>
            </Row>
        </Container>
    </>

}
export default FormeditProduct