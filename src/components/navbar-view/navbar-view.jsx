import React from "react";
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import "./navbar-view.scss"

export function NavbarView({user}) {

  const onLoggedOut = () => {
    localStorage.clear();
    window.open("/", "_self");
  }

  const isAuth = () => {
    if (typeof window == "undefined") {
      return false;
    }
    if (localStorage.getItem("token")) {
      return localStorage.getItem("token");
    } else {
      return false;
    }
  };

  return (
    <Navbar className="main-nav" sticky="top" expand="lg" variant="dark" >
      <Container className="navbar-container">
        <Navbar.Brand className="navbar-logo" href="/">MyFlix-client</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" id="navbar-middle" />
        <Navbar.Collapse id="responsive-navbar-nav">

          <Nav className="ml-auto">
            {isAuth() && (
              <Nav.Link className="navbar-buttons-user" href={`/users/${user}`}>{user}</Nav.Link>
            )}
            {isAuth() && (
              <Button className="navbar-buttons-logout" variant="link" onClick={() =>  onLoggedOut() }>Logout</Button>
            )}
            {!isAuth() && (
              <Nav.Link className="navbar-buttons" href="/">Login</Nav.Link>
            )}
            {!isAuth() && (
              <Nav.Link className="navbar-buttons" href="/register">Sign-up</Nav.Link>
            )}

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}