import axios from "axios"
import { useEffect, useState } from "react"
import { Button, Col, Container, Form, Row } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

const Editstatus = () => {
    const [status, setStatus] = useState({})
    const orderid = JSON.parse(localStorage.getItem("orderid"))
    const navigate = useNavigate()
    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get("http://localhost:4000/orderdetail", { params: { orderid: orderid } })

            setStatus(res.data.Orderstatus.status)

        }
        fetchData()
    }, [])

    const handleChange = (e) => {
        console.log(e.target.value)
        setStatus(e.target.value)
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.put("http://localhost:4000/editstatus", { status }, { params: { orderid: orderid } })
        navigate('/editorder')
    }
    console.log(status)
    return <Container>
        <Row>
            <Col className="bg-secondary">

                <h1>Edit Status Id: {orderid}</h1>
                <Form onSubmit={onSubmit}>
                    <Form.Group>
                        <Col sm={3}>
                            <Form.Label>Select Status</Form.Label>
                            <Form.Select value={status} onChange={handleChange}>
                                <option value={"In Process"} >In Process</option>
                                <option value={"On Delivery"} >On Delivery</option>
                                <option value={"Complete"} >Complete</option>
                            </Form.Select>
                        </Col>
                    </Form.Group>
                    <Button className="m-3" variant="dark" type="submit">submit</Button>
                </Form>
            </Col>
        </Row>
    </Container>
}

export default Editstatus