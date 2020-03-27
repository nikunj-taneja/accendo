import React from "react";

import { Link } from "react-router-dom";

import { Navbar, Nav } from "react-bootstrap";

import "../styles/Header.css";

import LoginModal from "./LoginModal";

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
            <Nav.Item>
              <Link to="/Gallery">Gallery</Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="/Profile">Profile</Link>
            </Nav.Item>
          </Nav>
          <Nav>
            <Nav.Item>
              <LoginModal />
            </Nav.Item>
            <Nav.Item>
              <Link to="/SignUp">Sign Up</Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Header;
