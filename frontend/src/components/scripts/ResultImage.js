import React from "react";

import { Button, Container, Form, Image } from "react-bootstrap";
import AuthContext from "./AuthContext";
import axios from "axios";
import { Redirect } from "react-router-dom";

//Shows the result of stylize and supersize
//Gives the user the option to post the result to community
class ResultImage extends React.Component {
  state = {
    redirect_to_community: false,
  };
  static contextType = AuthContext;

  handlePost = async () => {
    var data = new FormData();

    data.set("username", this.context.username);
    data.set("file_id", this.props.file_id);
    const response = await axios({
      method: "post",
      url: "/post",
      data: data,
      headers: { "Content-Type": "multipart/form-data" },
    });

    console.log(response);
    this.setState({ redirect_to_community: true });
  };

  render() {
    const imgsrc = `/file/${this.props.file_id}`;
    return this.state.redirect_to_community ? (
      <Redirect to="/communitygallery" />
    ) : (
      <Container
        style={{ background: "#141e30", padding: 20, borderRadius: 20 }}
        className="text-center"
      >
        <h3>Here's your image!</h3>
        <Image style={{ maxHeight: 400 }} fluid src={imgsrc} />
        <Button size="lg" block className="mt-3" onClick={this.handlePost}>
          Post
        </Button>
        <Button size="lg" block className="mt-3" onClick={this.props.reset}>
          Back
        </Button>
      </Container>
    );
  }
}

export default ResultImage;
