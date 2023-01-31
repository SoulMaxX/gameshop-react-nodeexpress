import axios from "axios"
import { useEffect, useState } from "react"
import Editdetail from "./Editdetail"
import Header from "./Header"

const Editproduct = () => {
    const [product, setProduct] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get('http://localhost:4000/product')
            const data = result.data
            setProduct(data)
        }
        fetchData()
    }, [])
    // if(product.data){

    //     console.log(product.data)
    // }
    return <div>
        <Header></Header>
        <div className="block">

            <h1>Edit Product</h1>
            <table>
                <thead>
                    <tr>
                        <th>Product Id</th>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>{product.map((product)=>
                    <Editdetail key={product.productid} product={product}></Editdetail>
                        )}
                </tbody>
            </table>
        </div>
    </div>
}
export default Editproduct