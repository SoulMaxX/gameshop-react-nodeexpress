import React from "react";

const Header = (props) => {
  const { countCartItems } = props
  const auth = localStorage.getItem('user')
  const authobject = auth ? JSON.parse(auth) : []
  // console.log(authobject.username)
  const logout = () => {
    localStorage.setItem('user', [])
  }
  return (
    <header className="row block">
      <div className="menu">
        <a href="/">Game</a>
      </div>

      {/* <div className=" menu">
        <a href="/">Console</a>
      </div>
      <div className=" menu">
        <a href="/">Accessories</a>
      </div> */}
      <div className="login">
        <a href="/">Cart
          {countCartItems ? (<button>{countCartItems}</button>) : (' ')}
        </a>
        <span> {auth ? <span><a href="/order" >Order</a><a href="/">{authobject.username}</a> <a onClick={logout} href="/">logout</a></span> : <a href="/login">Sing in</a>}
        </span>

      </div>
    </header>
  );
};

export default Header;
