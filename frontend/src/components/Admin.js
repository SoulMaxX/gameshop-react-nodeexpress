import { useEffect } from "react";
import { useNavigate } from "react-router-dom"
import Header from "./Header";


const Admin = () => {
    const navigate = useNavigate();

    const admin = JSON.parse(localStorage.getItem('user')).lv
    // console.log(admin)
    useEffect(() => {

        if (!(admin === "admin")) {
            navigate('/')
        }
    }, [])
    return (<div>
        <Header></Header>
        <div className="block" >
            <h1>Admin</h1>
            <a href="/addproduct"> Add Product</a>
            <a href="/editproduct"> Edit Product</a>
            <a href="/editorder"> Edit Order</a>
        </div>
    </div>
    )
}
export default Admin