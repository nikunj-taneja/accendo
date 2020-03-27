import React from "react";

import { Link } from "react-router-dom";

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
            <Nav.Link>
              <Link to="/Gallery">Gallery</Link>
            </Nav.Link>
            <Nav.Link>
              <Link to="/Profile">Profile</Link>
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link>Login</Nav.Link>
            <Nav.Link>
              <Link to="/SignUp">Sign Up</Link>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Header;
