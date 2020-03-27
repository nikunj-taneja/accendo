import React from "react";

import { Navbar, Nav } from "react-bootstrap";

import "../styles/Header.css";

class Header extends React.Component {
  render() {
    return (
      <Navbar className="header shadow-sm" expand="lg">
        <Navbar.Brand href="#home" className="header-name">
          Accendo
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse>
          <Nav className="mr-auto">
            <Nav.Link href="#gallery">Gallery</Nav.Link>
            <Nav.Link href="#profile">Profile</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="#login">Login</Nav.Link>
            <Nav.Link href="#signup">Sign Up</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Header;
