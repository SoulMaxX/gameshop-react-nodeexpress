import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const Editstatus = () => {
    const [status, setStatus] = useState({})
    const orderid = JSON.parse(localStorage.getItem("orderid"))
    const navigate =useNavigate()
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
    return <div className="block">
        <h1>Edit Status Id: {orderid}</h1>
        <form onSubmit={onSubmit}>
            <label>Select Status</label>
            <select value={status} onChange={handleChange}>
                <option value={"In Process"} >In Process</option>
                <option value={"On Delivery"} >On Delivery</option>
                <option value={"Complete"} >Complete</option>
            </select>
            <button type="submit">submit</button>
        </form>
    </div>
}

export default Editstatus