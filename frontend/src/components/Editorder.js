import axios from "axios"
import { useEffect, useState } from "react"
import { Col, Container, Row, Table } from "react-bootstrap"
import Header from "./Header"
import Orderlist from "./Orderlist"

const EditOrder = () => {
    const [orders, setOrders] = useState([])
    useEffect(() => {

        const Fetchdata = async () => {
            const res = await axios.get('http://127.0.0.1:4000/allorder')
            let order = res.data

            setOrders(order)
        }
        Fetchdata()
    }, [])
    // console.log(orders)
    return <>
        <Header></Header>
        <Container>
            <Row>
                <Col className="bg-secondary order">

                    <h1>Edit Order</h1>
                    <Table variant="dark" striped >
                        <thead>
                            <tr>
                                <th>Order</th>
                                <th>Date</th>
                                <th>Fullname</th>
                                <th>Address</th>
                                <th>Totalprice</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>{orders.map((order) => (
                            <Orderlist key={order.orderid} order={order}></Orderlist>
                        ))}

                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    </>
}
export default EditOrder