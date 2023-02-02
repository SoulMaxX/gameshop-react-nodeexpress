import axios from "axios";
import { useEffect, useState } from "react";
import Orderlist from "./Orderlist";
import Header from "./Header";


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
    return <div >
        <Header></Header>
        <div className="block order">

            <h1>Order</h1>

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
                <tbody>{order.map((order) => (
                    <Orderlist key={order.orderid} order={order}></Orderlist>
                ))}

                </tbody>
            </table>
        </div>
    </div>
}
export default Order