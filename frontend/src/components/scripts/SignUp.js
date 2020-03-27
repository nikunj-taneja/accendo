import React from "react";

import { Form, Button } from "react-bootstrap";

import "../styles/SignUp.css";

class SignUp extends React.Component {
  render() {
    return (
      <Form>
        <Form.Group>
          <Form.Label className="bodyText">Name</Form.Label>
          <Form.Control size="lg" type="text" className="bodyInput" />
        </Form.Group>
        <Form.Group>
          <Form.Label className="bodyText">Email</Form.Label>
          <Form.Control size="lg" type="email" className="bodyInput" />
        </Form.Group>
        <Form.Group>
          <Form.Label className="bodyText">Password</Form.Label>
          <Form.Control
            size="lg"
            type="password"
            className="bodyInput"
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label className="bodyText">Confirm Password</Form.Label>
          <Form.Control
            size="lg"
            type="password"
            className="bodyInput"
          ></Form.Control>
        </Form.Group>
        <div className="text-right">
          <Button size="lg">Submit</Button>
        </div>
      </Form>
    );
  }
}

export default SignUp;
