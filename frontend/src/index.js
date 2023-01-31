import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Form from "./components/Form";
import Login from "./components/Login";
import Register from "./components/Register";
import Order from "./components/Order";
import Orderdetail from "./components/Orderdetail";
import Admin from "./components/Admin";
import NotFound from "./components/Notfound";
import Addproduct from "./components/Addproduct";
import Editproduct from "./components/Editproduct";
import Formedit from "./components/Formedit";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      {/* <App /> */}
      <Routes>
        <Route index element={<App/>} ></Route>
        <Route path="form" element={<Form/>} ></Route>
        <Route path="login" element={<Login/>}></Route>
        <Route path="register" element={<Register/>}></Route>
        <Route path="order" element={<Order/>}></Route>
        <Route path="orderdetail" element={<Orderdetail/>}></Route>
        <Route path="admin" element={<Admin/>}></Route>
        <Route path="addproduct" element={<Addproduct/>}></Route>
        <Route path="editproduct" element={<Editproduct/>}></Route>
        <Route path="formedit" element={<Formedit/>}></Route>
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
