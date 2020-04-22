import React from "react";
import { Container, Button } from "react-bootstrap";

import AuthContext from "./AuthContext";

import axios from "axios";

class ImagePage extends React.Component {
  static contextType = AuthContext;

  handleSupersize = async () => {
    var data = new FormData();

    data.set("file_id", this.props.file_id);
    const response = await axios({
      method: "post",
      url: "/supersize",
      data: data,
      headers: { "Content-Type": "multipart/form-data" },
    });

    console.log(response);
  };

  render() {
    console.log(`http:localhost:5000/${this.props.file_id}`);
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
        <Button size="lg" block className="mt-3" onClick={this.handleSupersize}>
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
