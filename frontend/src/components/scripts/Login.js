import React from "react";

import { Button, Form } from "react-bootstrap";

class Login extends React.Component {
  render() {
    return (
      <div>
        <Form>
          <Form.Group>
            <Form.Label className="bodyText">Email address</Form.Label>
            <Form.Control
              size="lg"
              type="email"
              className="bodyInput"
              id="Modal-email"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className="bodyText">Password</Form.Label>
            <Form.Control
              size="lg"
              type="password"
              className="bodyInput"
            ></Form.Control>
          </Form.Group>
        </Form>
        <div className="text-right">
          <Button size="lg" class="primaryButton ">
            Login
          </Button>
        </div>
      </div>
    );
  }
}

export default Login;
