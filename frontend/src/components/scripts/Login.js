import React from "react";
import axios from "axios";

import { Button, Form } from "react-bootstrap";

class Login extends React.Component {
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
    var data = new FormData();
    data.set("username", this.state.username);
    data.set("password", this.state.password);

    axios({
      method: "post",
      url: "/login",
      data: data,
      headers: { "Content-Type": "multipart/form-data" },
    }).then(function (response) {
      console.log(response);
    });
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
