import React from "react";

const Product = (props) => {
  const { product,onAdd } = props;
  // console.log(product)
  return (
    <div>
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
