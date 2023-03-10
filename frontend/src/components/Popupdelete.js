import axios from "axios"
import { Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

const Popupdelete = (props) => {
    const navigate = useNavigate()
    const productid = JSON.parse(localStorage.getItem('product'))
    const onDelete = async () => {
        await axios.delete('http://127.0.0.1:4000/product/delete', { params: { productid: productid } },
            { headers: { 'Content-Type': 'application/json' } })
        navigate("/editproduct")
    }
    // console.log(props.trigger)

    return (props.trigger) ? (
        <div className="popup">
            <div className="popup-inner">
                <h1>Confirm Delete Product Id:{productid}</h1>
                <Button className="m-2" variant="danger" onClick={onDelete}>delete</Button>
                <Button  variant="dark" className="close-btn" onClick={() => props.setTrigger(false)}>close</Button>
            </div>
        </div>) : ''
}
export default Popupdelete