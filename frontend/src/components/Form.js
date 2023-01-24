import { useState } from "react";
import { Link } from "react-router-dom";

const Form = (props) => {
  const [order, setOrder] = useState({
    fullname: "",
    address: "",
    phone: "",
    email: "",
  });

  const user = JSON.parse(localStorage.getItem('user')) 
  // console.log(user)

  const handleChange = (e) => {
    // console.log(e.target.name);

    setOrder({ ...order, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    console.log("submit", order);
  };
  const cart = JSON.parse(localStorage.getItem("cart-item"));
  // console.log(cart.map((x) => x));
  const itemsPrice = cart.reduce((a, c) => a + c.price * c.qty, 0);
  return (
    <div className="block">
      <form onSubmit={onSubmit}>
        <h1>Order</h1>
        <label className="form-control">FullName</label>
        <br />
        <input className="form-control" type="text" name="fullname" onChange={handleChange} />
        <br />
        <label>Address</label>
        <br />
        <textarea type="text" name="address" onChange={handleChange} />
        <br />
        <label>Phone</label>
        <br />
        <input type="tel" name="phone" onChange={handleChange} />
        <br />
        <label>Email</label>
        <br />
        <input type="email" name="email" onChange={handleChange} value={user.email}/>
        <br />
        <input type={"submit"} />
      </form>
      <p>Cart</p>
      {cart.map((x) => (
        <div key={x.productid}>
          <p/>{x.name} x {x.qty}
          <p/>${x.price} 
        </div>
      ))}
      <p>Total {itemsPrice}</p>
      <button>
        <Link to={"/"}>Back</Link>
      </button>
    </div>
  );
};

export default Form;
