import React from "react";

import AuthContext from "./AuthContext";

import { Button, Form, Alert } from "react-bootstrap";

//Manages login form data and submission
class Login extends React.Component {
  static contextType = AuthContext;

  state = {
    username: "",
    password: "",
    showError: false,
  };

  handleChange = (event) => {
    const name = event.target.name;
    const val = event.target.value;

    this.setState({
      [name]: val,
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const login = await this.context.login(
      this.state.username,
      this.state.password
    );

    if (!login) {
      this.setState({ showError: true });
    }
  };

  render() {
    return (
      <div>
        <Alert
          variant="danger"
          onClose={() => this.setState({ showError: false })}
          dismissible
          show={this.state.showError}
        >
          Invalid Username or Password
        </Alert>
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
