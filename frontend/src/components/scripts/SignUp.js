import React from "react";

import { Form, Button } from "react-bootstrap";

import axios from "axios";

import "../styles/SignUp.css";

class SignUp extends React.Component {
  constructor() {
    super();
    this.state = {
      errors: {
        username: "",
        password: "",
        confirm_pass: "",
        email: "",
      },
      email: "",
      username: "",
      password: "",
      confirm_pass: "",
    };
  }

  handleChange = (event) => {
    const validEmailRegex = RegExp(
      /^(([^<>()[\].,;:\s@"]+(\.[^<>()[]\.,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i
    );

    const name = event.target.name;
    const value = event.target.value;
    const errors = this.state.errors;

    this.setState({ [name]: value, errors: errors });

    switch (name) {
      case "username":
        errors.username =
          value.length >= 6 || value.length === 0
            ? ""
            : "Username must be 6 characters or longer";
        break;
      case "email":
        errors.email =
          validEmailRegex.test(value) || value.length === 0
            ? ""
            : "Email is not valid!";
        break;
      case "password":
        errors.password = errors.confirm_pass =
          this.state.confirm_pass === value ? "" : "Passwords do not match!";

        break;
      case "confirm_pass":
        errors.password = errors.confirm_pass =
          value === this.state.password ? "" : "Passwords do not match!";
        break;
      default:
        break;
    }
  };

  TrySignUp = (event) => {
    event.preventDefault();
    var data = new FormData();
    data.set("username", this.state.username);
    data.set("email", this.state.email);
    data.set("password", this.state.password);
    axios({
      method: "post",
      url: "/register",
      data: data,
      headers: { "Content-Type": "multipart/form-data" },
    }).then(function (response) {
      console.log(response);
    });
  };

  render() {
    return (
      <Form>
        <Form.Group>
          <Form.Label className="bodyText">Name</Form.Label>
          <Form.Control
            name="username"
            size="lg"
            type="text"
            className="bodyInput"
            isInvalid={!!this.state.errors.username}
            onChange={this.handleChange}
          />
          <Form.Control.Feedback type="invalid">
            {this.state.errors.username}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Label className="bodyText">Email</Form.Label>
          <Form.Control
            name="email"
            isInvalid={!!this.state.errors.email}
            size="lg"
            type="email"
            className="bodyInput"
            onChange={this.handleChange}
          />
          <Form.Control.Feedback type="invalid">
            {this.state.errors.email}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Label className="bodyText">Password</Form.Label>
          <Form.Control
            name="password"
            size="lg"
            type="password"
            className="bodyInput"
            onChange={this.handleChange}
            isInvalid={!!this.state.errors.password}
          ></Form.Control>
          <Form.Control.Feedback type="invalid">
            {this.state.errors.password}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Label className="bodyText">Confirm Password</Form.Label>
          <Form.Control
            name="confirm_pass"
            size="lg"
            type="password"
            className="bodyInput"
            onChange={this.handleChange}
            isInvalid={!!this.state.errors.confirm_pass}
          ></Form.Control>
          <Form.Control.Feedback type="invalid">
            {this.state.errors.confirm_pass}
          </Form.Control.Feedback>
        </Form.Group>
        <div className="text-left">
          <Button type="submit" size="lg" onClick={this.TrySignUp}>
            Submit
          </Button>
        </div>
      </Form>
    );
  }
}

export default SignUp;
