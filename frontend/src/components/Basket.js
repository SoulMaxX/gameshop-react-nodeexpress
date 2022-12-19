import React from "react";

const Basket = (props) => {
  const { cartItems, onAdd, onRemove,clear } = props;
  const itemsPrice = cartItems.reduce((a, c) => a + c.price * c.qty, 0);
  const shippingPrice = itemsPrice > 50000 ? 0 : 200;
  const totalPrice = itemsPrice + shippingPrice;
  return (
    <div className="block col-1">
      <h2>Cart Items</h2>
      <div>
        {cartItems.length === 0 && <div> Cart Is Empty</div>}
        {cartItems.map((item) => (
          <div key={item.id} className="row">
            <div className="col-2">{item.name}</div>
            <div className="col-2">
              <button onClick={() => onAdd(item)}>+</button>
              <button onClick={() => onRemove(item)}>-</button>
            </div>
            <div className="col-2 text-right">
              {item.qty} x ${item.price.toFixed(2)}
            </div>
          </div>
        ))}
        {cartItems.length !== 0 && (
          <>
            <hr></hr>
            <div className="row">
              <div className="col-2">itemsPrice:</div>
              <div className="col-1 text-right">${itemsPrice.toFixed(2)}</div>
            </div>
            <div className="row">
              <div className="col-2">shippingPrice:</div>
              <div className="col-1 text-right">
                ${shippingPrice.toFixed(2)}
              </div>
            </div>
            <div className="row">
              <div className="col-2">shippingPrice:</div>
              <div className="col-1 text-right">${totalPrice.toFixed(2)}</div>
            </div>
            <hr></hr>
            <div>
                <button onClick={()=> clear()}>check out</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Basket;
