import React from "react";

import { Link } from "react-router-dom";

import { Navbar, Nav } from "react-bootstrap";

import AuthContext from "./AuthContext";

import "../styles/Header.css";

class Header extends React.Component {
  static contextType = AuthContext;

  render() {
    console.log("render");
    return (
      <Navbar className="header shadow-sm" expand="lg">
        <Navbar.Brand className="header-name">
          <Link to="/">Accendo</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse>
          <Nav className="mr-auto">
            <Nav.Item>
              <Link to="/CommunityGallery">Gallery</Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="/Profile">Profile</Link>
            </Nav.Item>
          </Nav>
          <Nav>
            <Navbar.Text>
              <h6 className="bodyText">
                {this.context.isAuth
                  ? "Logged in as: " + this.context.username
                  : "Not Logged in"}
              </h6>
            </Navbar.Text>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Header;
