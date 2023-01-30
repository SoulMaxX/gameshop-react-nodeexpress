import axios from "axios";
import { useState } from "react"
import { useNavigate } from "react-router-dom";

const Register = () => {

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [confirmpassword, setConfirmpassword] = useState();
    const [email, setEmail] = useState();
    const navigate = useNavigate();

    // console.log(username, password, confirmpassword, email)
    const handlerRegister = async () => {
        if (password === confirmpassword) {

            await axios.post('http://127.0.0.1:4000/register',
                { username: username, password: password, confirmpassword: confirmpassword, email: email }
                ,
                { headers: { 'Content-Type': 'application/json' } }
            )
            navigate("/login")
            

        } else {
            alert('password not match')
        }
    }
    return <div className="form-login">
        <h1>Register</h1>
        <form>
            <div>
                <label>Username</label>
                <input type={"text"} onChange={(e) => setUsername(e.target.value)}></input>
            </div>
            <div>
                <label>Password</label>
                <input type={"password"} onChange={(e) => setPassword(e.target.value)}></input>
            </div>
            <div>
                <label>Confirm Password</label>
                <input type={"password"} onChange={(e) => setConfirmpassword(e.target.value)}></input>
            </div>
            <div>
                <label>Email</label>
                <input type={'email'} onChange={(e) => setEmail(e.target.value)}></input>
            </div>
            <button onClick={handlerRegister} type="button">submit</button>
        </form>
    </div>
}

export default Register