import axios from "axios"
import { useEffect, useState } from "react"
import Header from "./Header"
import Orderproduct from "./Orderproduct"

const Orderdetail = () => {
    const [orderdetail, setOrderdetail] = useState([])
    const [product, setProduct] = useState([])
    const [date, setDate] = useState([])
    const [status,setStatus]= useState([])
    useEffect(() => {
        const fetchData = async () => {
            const orderid = JSON.parse(localStorage.getItem("orderid"))
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

    if(orderdetail.Orderstatus){
        const ordersta = async ()=>{
            const orderstatus = await orderdetail.Orderstatus.status
             setStatus(orderstatus)
        }
        ordersta()
    }

    // console.log(orderdetail.Orderstatus)
    return <div>
        <Header></Header>
        <div className="block order">

            <h1>Order detail</h1>
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

        </div>
    </div>
}
export default Orderdetail