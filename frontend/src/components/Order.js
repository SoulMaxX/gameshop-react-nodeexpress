import axios from "axios";
import { useEffect, useState } from "react";
import Orderlist from "./Orderlist";
import Header from "./Header";
import { Col, Container, Row, Table } from "react-bootstrap";


const Order = () => {
    const [order, setOrder] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            const userid = JSON.parse(localStorage.getItem('user')).userid
            const res = await axios.get("http://localhost:4000/order", { params: { userid: userid } })
            let orders = res.data
            // console.log(userid)
            setOrder(orders)
        }
        fetchData()


        //  async function fetchData () {

        //  const userid = 5
        //  const res = await axios.get("http://localhost:4000/order", { params: { userid: 5 } })
        //  console.log(res)
        // }

    }, [])
    // console.log(order)
    return (<>
            <Header></Header>
        <Container>
            <Row>
                    <Col className="order bg-secondary">
                        <h1 >Order</h1>

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
                            <tbody>{order.map((order) => (
                                <Orderlist key={order.orderid} order={order}></Orderlist>
                            ))}

                            </tbody>
                        </Table>
                    </Col>
            </Row>
        </Container>
    </>

    )
}
export default Order