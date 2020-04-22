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

  handleSubmit = () => {
    this.context.login(this.state.username, this.state.password);
  };

  render() {
    return (
      <div>
        <Form>
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
        </Form>
        <div className="text-right">
          <Button
            onClick={this.handleSubmit}
            size="lg"
            className="primaryButton "
          >
            Login
          </Button>
        </div>
      </div>
    );
  }
}

export default Login;
