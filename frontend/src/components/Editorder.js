import axios from "axios"
import { useEffect, useState } from "react"
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
    },[])
    // console.log(orders)
    return <div>
        <Header></Header>
        <div className="block">
            <h1>Edit Order</h1>
            <table className="table">
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
            </table>
        </div>
    </div>
}
export default EditOrder