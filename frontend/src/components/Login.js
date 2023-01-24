import { useState } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom"

const Login = () => {

    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate();
    // console.log(username, password)
    const handlerLogin = async () => {

        let result = await axios.post('http://127.0.0.1:4000/login',
            { username: username, password: password }
            ,
            { headers: { 'Content-Type': 'application/json' } }
        )
        console.log(result)
        if (result.data.username) {
            localStorage.setItem('user', JSON.stringify(result.data))
            navigate("/")
        }else{
            alert('username or password incorrect')
        }

    }
    return <div className="form-login">
        <h1>Please Login</h1>
        <form action="post">
            <div>
                <input name="username" placeholder="Username" onChange={(e) => setUsername(e.target.value)} required></input>
            </div>
            <div>
                <input name="password" placeholder="Password" type='password' onChange={(e) => setPassword(e.target.value)} required></input>
            </div>
            <button onClick={handlerLogin} type="button">Login</button>
        </form>


        <a href="/register"><button>Register</button></a>

    </div>
}

export default Login