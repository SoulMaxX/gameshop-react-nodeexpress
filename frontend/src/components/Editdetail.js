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
    <td><a href="/formeditproduct" onClick={handleClick}>Edit</a></td>
</tr>
}
export default Editdetail