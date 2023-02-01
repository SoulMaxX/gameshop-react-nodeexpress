import React from "react";

const Product = (props) => {
  const { product,onAdd } = props;
  // console.log(product)
  const image = 'ffvii.jpeg'

  return (
    <div className="product-inner">
        <img src={"http://127.0.0.1:4000/image/"+product.image} style={{ width: "200px", height: "200px" }}></img>
      <h3>{product.name}</h3>
      <div>${product.price}</div>
      <div>{product.quantity} Quantity</div>
      <div>
        <button onClick={() => onAdd(product)}>Add To Cart</button>
      </div>
    </div>
  );
};

export default Product;
