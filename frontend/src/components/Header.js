import React from "react";

const Header = (props) => {
  const {countCartItems} =props
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
        {countCartItems ? (<button>{countCartItems}</button>): (' ') }
        </a>
        <a href="/">Sing in</a>
      </div>
    </header>
  );
};

export default Header;
