import React from "react";
import { Row, Col } from "react-bootstrap";
import SignUp from "./SignUp";
import Login from "./Login";

class UserPage extends React.Component {
  render() {
    return (
      <Row>
        <Col>
          <h2 className="bodyText">Dont Have an account?</h2>
          <h1 className="titleText">Sign Up!</h1>
          <hr />
          <SignUp />
        </Col>
        <Col>
          <h2 className="bodyText">Or</h2>
          <h1 className="titleText">Login.</h1>
          <hr />
          <Login></Login>
        </Col>
      </Row>
    );
  }
}

export default UserPage;
