import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const Addproduct = () => {
    const navigate = useNavigate()
    const [product, setProduct] = useState({
        name: "",
        price: "",
        quantity: ""
    })

    const handleChange = (e) => {
        // console.log(e.target.value)
        setProduct({ ...product, [e.target.name]: e.target.value })
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        await axios.post('http://127.0.0.1:4000/product/create',product,
            { headers: { 'Content-Type': 'application/json' } })
        navigate("/admin")
    }
    console.log(product.name)
    return <div className="block">
        <h1>Add Product</h1>
        <form onSubmit={onSubmit}>
            <div>
                <label>Product Name :</label>
                <input type="text" name="name" onChange={handleChange}></input>
            </div>
            <div>
                <label>Price :</label>
                <input type="number" name="price" onChange={handleChange}></input>
            </div>
            <div>
                <label>Quantity :</label>
                <input type="number" name="quantity" onChange={handleChange}></input>
            </div>
            <button type={"submit"}>Submit</button>
        </form>
        <button> <a href="/admin">Back</a></button>
    </div>
}
export default Addproduct