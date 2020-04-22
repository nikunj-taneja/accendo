import React from "react";
import { Container, Button } from "react-bootstrap";

class ImagePage extends React.Component {
  render() {
    console.log(`http:localhost:5000/${this.props.file_id}`);
    return (
      <Container
        style={{ background: "#141e30", padding: 20, borderRadius: 20 }}
        className="text-center"
      >
        <h1>Image Successfully Uploaded!</h1>
        <img
          style={{ maxWidth: 500 }}
          src={`http://localhost:5000/file/${this.props.file_id}`}
        ></img>
        <Button size="lg" block className="mt-3">
          Supersize
        </Button>
        <Button size="lg" block className="mt-3">
          Stylize
        </Button>
      </Container>
    );
  }
}

export default ImagePage;
