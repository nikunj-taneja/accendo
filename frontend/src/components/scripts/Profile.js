import React from "react";

import AuthContext from "./AuthContext";

import { Container } from "react-bootstrap";
import Dropzone from "react-dropzone";
import "../styles/Profile.css";

class Profile extends React.Component {
  static contextType = AuthContext;
  render() {
    return (
      <div className="userInfo">
        <h5 className="pb-5 pt-5">Username: {this.context.username}</h5>

        <Dropzone
          onDrop={(acceptedFiles) => console.log(acceptedFiles)}
          accept="image/*"
        >
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps({ className: "dropzone" })}>
              <input {...getInputProps()} />
              <p className="bodyText">
                Drag 'n' drop some files here, or click to select files
              </p>
            </div>
          )}
        </Dropzone>
      </div>
    );
  }
}

export default Profile;
