import React from "react";

import { Container, Button } from "react-bootstrap";

class SuccessfulUpload extends React.Component {
  render() {
    return (
      <Container
        style={{ background: "#141e30", padding: 20, borderRadius: 20 }}
        className="text-center"
      >
        <h1>Image Successfully Uploaded!</h1>
        <img
          style={{ maxWidth: "100%" }}
          src={`http://localhost:5000/file/${this.props.file_id}`}
        ></img>
        <Button
          size="lg"
          block
          className="mt-3"
          onClick={this.props.handleSupersize}
        >
          Supersize
        </Button>
        <Button size="lg" block className="mt-3">
          Stylize
        </Button>
      </Container>
    );
  }
}

export default SuccessfulUpload;
