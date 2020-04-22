import React from "react";

import axios from "axios";

import AuthContext from "./AuthContext";

import Upload from "./Upload";
import ImagePage from "./ImagePage";

import "../styles/Profile.css";

class Profile extends React.Component {
  static contextType = AuthContext;
  state = {
    uploaded: false,
    file_id: null,
  };

  handleSubmit = async (file) => {
    var formdata = new FormData();
    formdata.append("image", file, file.fileName);
    formdata.set("username", this.context.username);

    const response = await axios.post("/upload", formdata, {
      headers: {
        accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(response);
    if (response.status === 200) {
      this.setState({ uploaded: true, file_id: response.data["file_id"] });
    }
  };

  render() {
    return (
      <div className="bodyText">
        <h5 className="pb-5 pt-3">Hi, {this.context.username}!</h5>
        {this.state.uploaded ? (
          <ImagePage file_id={this.state.file_id} />
        ) : (
          <Upload handleSubmit={this.handleSubmit} />
        )}
      </div>
    );
  }
}

export default Profile;
