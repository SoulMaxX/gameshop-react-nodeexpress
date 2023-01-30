import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Form = (props) => {
  const [order, setOrder] = useState({
    fullname: "",
    address: "",
    phone: "",
  });
  const navigate = useNavigate();

  const cart = JSON.parse(localStorage.getItem("cart-item"));

  const itemsPrice = cart.reduce((a, c) => a + c.price * c.qty, 0);

  const user = JSON.parse(localStorage.getItem('user'))

  const handleChange = (e) => {
    // console.log(e.target.value);

    setOrder({ ...order, [e.target.name]: e.target.value });
  };

  const onSubmit = async(e) => {
    e.preventDefault();
    await axios.post('http://127.0.0.1:4000/order',
                { order,userid: user.userid,cart:cart,total:itemsPrice }
                ,
                { headers: { 'Content-Type': 'application/json' } }
            )
            navigate("/")
            localStorage.setItem("cart-item",JSON.stringify([]))

    console.log("submit", order,{cart:cart},{total:itemsPrice});
  };

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
        {/* <label>Email</label>
        <br />
        <input type="email" name="email" onChange={handleChange} value={user.email}/>
        <br /> */}
        <p>Cart</p>
        {cart.map((x) => (
          <div name="productid" key={x.productid}>
            <p />{x.name} x {x.qty}
            <p />${x.price}
          </div>
        ))}
        <p>Total {itemsPrice}</p>
        <button type={"submit"}>Submit</button>
      </form>
      <button>
        <Link to={"/"}>Back</Link>
      </button>
    </div>
  );
};

export default Form;
