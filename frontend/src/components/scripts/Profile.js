import React from "react";

import AuthContext from "./AuthContext";

import { Container, Button } from "react-bootstrap";
import Dropzone from "react-dropzone";
import "../styles/Profile.css";

class Profile extends React.Component {
  static contextType = AuthContext;
  render() {
    return (
      <div className="bodyText">
        <h5 className="pb-5 pt-3">Hi, {this.context.username}!</h5>

        <h4 className="pb-4">Add Image: </h4>
        <Dropzone
          onDrop={(acceptedFiles) => console.log(acceptedFiles)}
          accept="image/*"
        >
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps({ className: "dropzone" })}>
              <input {...getInputProps()} />
              <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
          )}
        </Dropzone>

        <Container className="text-center pt-2">
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
