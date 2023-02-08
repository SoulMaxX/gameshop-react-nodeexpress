import axios from "axios"
import { useEffect, useState } from "react"
import { Col, Container, Row, Table } from "react-bootstrap"
import Editdetail from "./Editdetail"
import Header from "./Header"

const Editproduct = () => {
    const [product, setProduct] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get('http://localhost:4000/product')
            const data = result.data
            setProduct(data)
        }
        fetchData()
    }, [])
    // if(product.data){

    //     console.log(product.data)
    // }
    return <>
        <Header></Header>
        <Container>
            <Row>
                <Col className="bg-secondary order">

                    <h1>Edit Product</h1>
                    <Table variant="dark" striped>
                        <thead>
                            <tr>
                                <th>Product Id</th>
                                <th>Product Name</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>{product.map((product) =>
                            <Editdetail key={product.productid} product={product}></Editdetail>
                        )}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    </>
}
export default Editproduct