import axios from "axios"
import { Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

const PopupdeleteOrder= (props)=>{
    const navigate = useNavigate()
    const orderid = JSON.parse(localStorage.getItem('orderid'))
    const onDelete = async () => {
        await axios.delete('http://127.0.0.1:4000/orderdelete', { params: { orderid: orderid } },
            { headers: { 'Content-Type': 'application/json' } })
        navigate("/editorder")
    }
    // console.log(props.trigger)

    return (props.trigger) ? (
        <div className="popup">
            <div className="popup-inner">
                <h1>Confirm Delete Order Id:{orderid}</h1>
                <Button className="m-2" variant="danger" onClick={onDelete}>delete</Button>
                <Button  variant="dark" className="close-btn" onClick={() => props.setTrigger(false)}>close</Button>
            </div>
        </div>) : ''
}


export default PopupdeleteOrder