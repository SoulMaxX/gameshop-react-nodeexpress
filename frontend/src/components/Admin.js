import { useEffect } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom"
import Footer from "./Footer";
import Header from "./Header";


const Admin = () => {
    const navigate = useNavigate();

    const admin = JSON.parse(localStorage.getItem('user')).lv
    // console.log(admin)
    useEffect(() => {

        if (!(admin === "admin")) {
            navigate('/')
        }
    }, [])
    return (
        <>
            <Header></Header>
            <Container  >
                <Row>
                    <Col className="admin bg-secondary" >


                        <h1>Admin</h1>
                        <Button className="m-2" variant="dark" href="/addproduct"> Add Product</Button>
                        <Button className="m-2" variant="dark" href="/editproduct"> Edit Product</Button>
                        <Button className="m-2" variant="dark" href="/editorder"> Edit Order</Button>

                    </Col>
                </Row>

            </Container>
            <Footer></Footer>
        </>
    )
}
export default Admin