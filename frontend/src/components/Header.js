import React from "react";
import { Button, Container, Navbar } from 'react-bootstrap';

const Header = (props) => {
  const { countCartItems } = props
  const auth = localStorage.getItem('user')
  const authobject = auth ? JSON.parse(auth) : []

  // console.log(authobject.lv)
  const logout = () => {
    localStorage.setItem('user', [])
  }
  return (
    <Navbar className="navbar navbar-expand-lg navbar-light bg-secondary mb-3">
      <Container >
        <Button variant="dark" href="/">Game-Shop</Button>
        <div className="d-flex align-items-center">

          {authobject.lv === "admin" ? <Button className="me-2" variant="dark" href="admin">Admin</Button > : []}
          <Button className="me-2" variant="dark" href="/">Cart
            {/* {countCartItems ? (<Button className="me-2" variant="dark">{countCartItems}</Button>) : (' ')} */}
          </Button>
          {auth ? <> <Button className="me-2" variant="dark" href="/order" >Order</Button> <Button className="me-2" variant="dark" href="/">{authobject.username}</Button> <Button className="me-2" onClick={logout} variant="dark" href="/">logout</Button> </> : <Button className="me-2" variant="dark" href="/login">Sing in</Button>}

        </div>
      </Container>
    </Navbar>

  );
};

export default Header;
