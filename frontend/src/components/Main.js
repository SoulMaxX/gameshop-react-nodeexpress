import React from "react";
import Product from "./Product";

const Main = (props) => {
    const {products,onAdd} = props;
    // console.log(products)
    return <main className="block col-2">
        <h2>Product</h2>
        
        <div className="row">{products.map((product) =>(
            <Product key={product.id} product={product} onAdd={onAdd}></Product>
        ))}</div>

    </main>
}



export default Main