import React from "react";

const Product = (props) => {
  const { product,onAdd } = props;
  // console.log(product)
  return (
    <div>
      <h3>{product.Name}</h3>
      <div>${product.Price}</div>
      <div>{product.Quantity} Quantity</div>
      <div>
        <button onClick={() => onAdd(product)}>Add To Cart</button>
      </div>
    </div>
  );
};

export default Product;
