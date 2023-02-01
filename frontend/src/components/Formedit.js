import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Popupdelete from "./Popupdelete"

const Formedit = () => {
    // const [oldproduct,setOldproduct]= useState([])
    const navigate = useNavigate()
    const [popup, setPopup] = useState(false)
    const [product, setProduct] = useState({
        name: "",
        price: "",
        quantity: ""
    })
    const [file, setFile] = useState({})
    const [imagePre, setImagePre] = useState(null)
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
        const productid = JSON.parse(localStorage.getItem('product'))
        await axios.put('http://127.0.0.1:4000/product/edit', {name: product.name, price: product.price, quantity: product.quantity, image: file.name}, { params: { productid: productid } },
            { headers: { 'Content-Type': 'application/json' } })

        const formData = new FormData()
        formData.append('file', file)
        const uploadIma = await axios.post('http://127.0.0.1:4000/upload', formData)

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
                <div>
                    {product.image ? <img src={imagePre ? imagePre:"http://127.0.0.1:4000/image/" + product.image } style={{ width: "200px", height: "200px" }}></img> :''}
                    <br></br>
                    <label>Image Product :</label>
                    <input onChange={handleUpload} type="file" />
                </div>
                <button type={"submit"}>Submit</button>
            </form>
            <div>
                <button onClick={() => setPopup(true)}>Delete</button>
                <Popupdelete trigger={popup} setTrigger={setPopup}></Popupdelete>
            </div>
            <button> <a href="/editproduct">Back</a></button>
        </div>
    </div>

}
export default Formedit