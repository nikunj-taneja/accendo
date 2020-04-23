import React from "react";

import { Form, Button, Alert } from "react-bootstrap";

import AuthContext from "./AuthContext";

import "../styles/SignUp.css";

class SignUp extends React.Component {
  static contextType = AuthContext;

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
      valid: false,
      errMsg: "",
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
          value.length >= 6 ? "" : "Username must be 6 characters or longer";
        break;
      case "email":
        errors.email = validEmailRegex.test(value) ? "" : "Email is not valid!";
        break;
      case "password":
        errors.password =
          value.length >= 6 ? "" : "Password must be 6 characters or longer";
        break;
      case "confirm_pass":
        errors.confirm_pass =
          value === this.state.password ? "" : "Passwords do not match!";
        break;
      default:
        break;
    }

    var valid = true;
    const errVals = Object.values(errors);
    for (var i = 0; i < errVals.length; i++) {
      if (errVals[i] !== "") {
        valid = false;
      }
    }

    const formvals = this.state;

    const noEmpty =
      formvals.email.length &&
      formvals.confirm_pass.length &&
      formvals.password.length &&
      formvals.username.length;

    this.setState({
      valid: valid && noEmpty,
    });
  };

  TrySignUp = async (event) => {
    event.preventDefault();

    if (!this.state.valid) {
      console.log("please fix errors first");
      return;
    }

    const responseMsg = await this.context.register(
      this.state.username,
      this.state.email,
      this.state.password
    );

    if (responseMsg !== "ok") {
      this.setState({ errMsg: responseMsg });
    }
  };

  render() {
    return (
      <div>
        <Alert
          variant="danger"
          onClose={() => this.setState({ showError: false })}
          dismissible
          show={this.state.errMsg}
        >
          <Alert.Heading>{this.state.errMsg}</Alert.Heading>
        </Alert>{" "}
        <Form onSubmit={this.TrySignUp}>
          <Form.Group>
            <Form.Label className="bodyText">Username</Form.Label>
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
            <Button disabled={!this.state.valid} type="submit" size="lg">
              Submit
            </Button>
          </div>
        </Form>
      </div>
    );
  }
}

export default SignUp;
