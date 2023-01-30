const Orderproduct = (props) => {
    const { product } = props
   
    return <div>
        
        <div>
            <p>{product.Product.name} <span>Price: ${product.Product.price} </span> <span>Qty:{product.qty}</span></p>
            
        </div>
    </div>
}
export default Orderproduct