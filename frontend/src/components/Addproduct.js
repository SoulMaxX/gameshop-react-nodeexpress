import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Header from "./Header"

const Addproduct = () => {
    const navigate = useNavigate()
    const [product, setProduct] = useState({
        name: "",
        price: "",
        quantity: ""
    })
    const [file, setFile] = useState({})
    const [imagePre, setImagePre] = useState(null)


    const handleChange = (e) => {
        // console.log(e.target.value)
        setProduct({ ...product, [e.target.name]: e.target.value })
    }

    const handleUpload = (e) => {
        // console.log(e.target.files[0].name)

        if (e.target.files[0]) {

            const file = e.target.files[0]
            const reader = new FileReader()
            reader.onloadend = () => {
                setFile(file)
                setImagePre(reader.result)
            }
            reader.readAsDataURL(file)
        }

    }
    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.post('http://127.0.0.1:4000/product/create', { name: product.name, price: product.price, quantity: product.quantity, image: file.name },
            { headers: { 'Content-Type': 'application/json' } })

        const formData = new FormData()
        formData.append('file', file)
        const uploadIma = await axios.post('http://127.0.0.1:4000/upload', formData)

        navigate("/admin")

    }
    console.log(file.name)



    return <div>
        <Header></Header>
        <div className="block">
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
                <div>
                    <img src={imagePre} style={{ width: "200px", height: "200px" }}></img>
                    <br></br>
                    <label>Image Product :</label>
                    <input onChange={handleUpload} type="file" />
                </div>
                <button type={"submit"}>Submit</button>
            </form>
            <button> <a href="/admin">Back</a></button>
        </div>
    </div>
}
export default Addproduct