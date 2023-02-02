import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Header from "./Header"
import Orderproduct from "./Orderproduct"

const Orderdetail = () => {
    const [orderdetail, setOrderdetail] = useState([])
    const [product, setProduct] = useState([])
    const [date, setDate] = useState([])
    const [status, setStatus] = useState([])
    const orderid = JSON.parse(localStorage.getItem("orderid"))
    const navigate=useNavigate()
    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get("http://localhost:4000/orderdetail", { params: { orderid: orderid } })
            let detail = res.data
            let products = res.data.Orderitems
            await setOrderdetail(detail)
            await setProduct(products)
            // console.log(detail,products)
        }
        fetchData()

    }, [])
    if (orderdetail.createdAt) {

        const date = async () => {
            const date = await new Date(orderdetail.createdAt)
            const dateformat = await new Intl.DateTimeFormat('en-GB', { dateStyle: 'full' }).format(date)
            setDate(dateformat)
        }
        date()
    }

    if (orderdetail.Orderstatus) {
        const ordersta = async () => {
            const orderstatus = await orderdetail.Orderstatus.status
            setStatus(orderstatus)
        }
        ordersta()
    }
    const admin = JSON.parse(localStorage.getItem('user')).lv

    const onDelete = async (e) => {
        e.preventDefault();
        await axios.delete("http://localhost:4000/orderdelete",{params: {orderid:orderid}})
        navigate('/editorder')
    }
    return <div>
        <Header></Header>
        <div className="block order">

            <h1>Order detail Id: {orderdetail.orderid}</h1>
            <p >Date: {date}</p>
            <p>Fullname: {orderdetail.fullname}</p>
            <p>Address: {orderdetail.address}</p>
            <p>Phone: {orderdetail.phone}</p>
            <br></br>
            <h1>Product</h1>
            <div>{product.map((product) => (
                <Orderproduct key={product.productid} product={product}></Orderproduct>
            ))}
            </div>
            <p>TotalPrice: {orderdetail.totalprice}</p>
            <br></br>
            <h1>Status</h1>
            <p>{status}</p>

            {admin == "admin" ? <button><a href="/editstatus">Edit Status</a></button> : ''}
            {admin == "admin" ? <button><a onClick={onDelete}>Delete Order</a></button> : ''}

        </div>
    </div>
}
export default Orderdetail