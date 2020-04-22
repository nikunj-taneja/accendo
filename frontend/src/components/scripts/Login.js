import React from "react";

import AuthContext from "./AuthContext";

import { Button, Form } from "react-bootstrap";

class Login extends React.Component {
  static contextType = AuthContext;

  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
    };
  }

  handleChange = (event) => {
    const name = event.target.name;
    const val = event.target.value;

    this.setState({
      [name]: val,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.context.login(this.state.username, this.state.password);
  };

  render() {
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Label className="bodyText">Username</Form.Label>
            <Form.Control
              name="username"
              type="text"
              size="lg"
              className="bodyInput"
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className="bodyText">Password</Form.Label>
            <Form.Control
              name="password"
              size="lg"
              type="password"
              className="bodyInput"
              onChange={this.handleChange}
            ></Form.Control>
          </Form.Group>
          <div className="text-right">
            <Button size="lg" type="submit" className="primaryButton ">
              Login
            </Button>
          </div>
        </Form>
      </div>
    );
  }
}

export default Login;
