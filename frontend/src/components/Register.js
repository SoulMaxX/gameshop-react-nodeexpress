const Register = () => {
    return <div className="form-login">
        <h1>Register</h1>
        <form action="post">
            <div>
                <label>Username</label>
                <input type={"text"}></input>
            </div>
            <div>
                <label>Password</label>
                <input type={"password"}></input>
            </div>
            <div>
                <label>Confirm Password</label>
                <input type={"password"}></input>
            </div>
            <div>
                <label>Email</label>
                <input type={'email'}></input>
            </div>
            <button type="submit">submit</button>
        </form>
    </div>
}

export default Register