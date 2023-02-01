import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Popupdelete from "./Popupdelete"

const Formedit = () => {
    // const [oldproduct,setOldproduct]= useState([])
    const navigate = useNavigate()
    const [popup,setPopup]=useState(false)
    const [product, setProduct] = useState({
        name: "",
        price: "",
        quantity: ""
    })
    useEffect(() => {
        const fetchData = async () => {
            const productid = JSON.parse(localStorage.getItem('product'))
            const result = await axios.get('http://localhost:4000/product/find', { params: { productid: productid } })
            const data = result.data
            setProduct(data)
            // console.log(data)
        }
        fetchData()
    }, [])
    // console.log(oldproduct)

    const handleChange = (e) => {
        // console.log(e.target.value)

        setProduct({ ...product, [e.target.name]: e.target.value })
    }
    // console.log(product)

    const onSubmit = async (e) => {
        e.preventDefault();
        const productid = JSON.parse(localStorage.getItem('product'))
        await axios.put('http://127.0.0.1:4000/product/edit', product, { params: { productid: productid } },
            { headers: { 'Content-Type': 'application/json' } })
        navigate("/editproduct")
    }

   
    return <div>
        <div className="block">
            <h1>Edit Product Id: {product.productid}</h1>
            <form onSubmit={onSubmit}>
                <div>
                    <label>Product Name :</label>
                    <input type="text" name="name" onChange={handleChange} value={product.name}></input>
                </div>
                <div>
                    <label>Price :</label>
                    <input type="number" name="price" onChange={handleChange} value={product.price}></input>
                </div>
                <div>
                    <label>Quantity :</label>
                    <input type="number" name="quantity" onChange={handleChange} value={product.quantity}></input>
                </div>
                <button type={"submit"}>Submit</button>
            </form>
            <div>
                <button onClick={()=>setPopup(true)}>Delete</button>
                <Popupdelete trigger={popup} setTrigger={setPopup}></Popupdelete>
            </div>
            <button> <a href="/admin">Back</a></button>
        </div>
    </div>

}
export default Formedit