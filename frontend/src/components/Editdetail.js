import { Button } from "react-bootstrap"

const Editdetail=(props)=>{
    const {product }= props
    const handleClick=()=>{
        localStorage.setItem('product',product.productid)
    }
    return<tr>
    <td>{product.productid}</td>
    <td>{product.name}</td>
    <td>{product.price}</td>
    <td>{product.quantity}</td>
    <td><Button variant="dark" href="/formeditproduct" onClick={handleClick}>Edit</Button></td>
</tr>
}
export default Editdetail