import React from "react";

import AuthContext from "./AuthContext";

import { Container, Button, Spinner } from "react-bootstrap";
import Dropzone from "react-dropzone";
import "../styles/Profile.css";
import axios from "axios";

class Profile extends React.Component {
  state = {
    file: null,
    loading: false,
    selected: false,
    loadedFile: null,
  };

  static contextType = AuthContext;

  handleDrop = (acceptedFiles) => {
    const reader = new FileReader();

    const file = acceptedFiles[0];

    this.setState({
      file: file,
      loading: true,
      selected: true,
    });

    reader.addEventListener("load", () => {
      this.setState({
        loading: false,
        loadedFile: reader.result,
      });
    });
    reader.readAsDataURL(file);
  };

  handleSubmit = async () => {
    var formdata = new FormData();
    formdata.append("image", this.state.file, this.state.file.fileName);
    formdata.set("username", this.context.username);

    const response = await axios.post("/upload", formdata, {
      headers: {
        accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    });

    console.log(response);
  };

  render() {
    return (
      <div className="bodyText">
        <h5 className="pb-5 pt-3">Hi, {this.context.username}!</h5>

        <Container>
          <h4 className="pb-4">Add Image: </h4>
          <Dropzone onDrop={this.handleDrop} accept="image/*">
            {({ getRootProps, getInputProps }) => (
              <section>
                <div {...getRootProps({ className: "dropzone" })}>
                  <input {...getInputProps()} />

                  <p>Drag 'n' drop some files here, or click to select files</p>
                  <aside>
                    {this.state.selected ? (
                      this.state.loading ? (
                        <Spinner animation="grow" />
                      ) : (
                        <img
                          src={this.state.loadedFile}
                          className="thumbImg"
                        ></img>
                      )
                    ) : (
                      ""
                    )}
                  </aside>
                </div>
              </section>
            )}
          </Dropzone>
          <Button size="lg" block className="mt-3" onClick={this.handleSubmit}>
            Upload
          </Button>
          <Button size="lg" block className="mt-3">
            Supersize
          </Button>
          <Button size="lg" block className="mt-3">
            Stylize
          </Button>
        </Container>
      </div>
    );
  }
}

export default Profile;
