import React from "react";

import { Button, Container, Form } from "react-bootstrap";
import { Redirect, Link } from "react-router-dom";

class ResultImage extends React.Component {
  render() {
    return (
      <Container
        style={{ background: "#141e30", padding: 20, borderRadius: 20 }}
        className="text-center"
      >
        <h1>Here's your image!</h1>
        <img
          style={{ maxWidth: "100%" }}
          src={`http://localhost:5000/file/${this.props.file_id}`}
        ></img>
        <Form>
          <Form.Check
            size="lg"
            type="checkbox"
            id="public"
            label="Set Public?"
            className="mt-3"
          />
          <Button
            size="lg"
            block
            className="mt-3"
            type="submit"
            onClick={this.props.reset}
          >
            Done
          </Button>
        </Form>
      </Container>
    );
  }
}

export default ResultImage;
