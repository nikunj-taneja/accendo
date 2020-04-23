import React from "react";

import AuthContext from "./AuthContext";

import axios from "axios";
import ResultImage from "./ResultImage";
import SuccessfulUpload from "./SuccessfulUpload";

class ImagePage extends React.Component {
  state = { stylized: false, resultId: null };

  static contextType = AuthContext;

  handleSupersize = async () => {
    var data = new FormData();

    data.set("file_id", this.props.file_id);

    this.context.setWaiting(true);
    const response = await axios({
      method: "post",
      url: "/supersize",
      data: data,
      headers: { "Content-Type": "multipart/form-data" },
    });
    this.context.setWaiting(false);
    console.log(response);

    this.setState({
      stylized: true,
      resultId: response.data.file_id,
    });
  };

  handleStylize = async (img_url) => {
    console.log(img_url);

    this.context.setWaiting(true);

    var response = await fetch(img_url);
    var blob = await response.blob();

    var data = new FormData();
    data.set("username", this.context.username);
    data.set("file_id", this.props.file_id);
    data.append("style_img", blob, img_url);
    const axiosresponse = await axios({
      method: "post",
      url: "/stylize",
      data: data,
      headers: { "Content-Type": "multipart/form-data" },
    });
    this.context.setWaiting(false);

    console.log(axiosresponse);

    this.setState({
      stylized: true,
      resultId: axiosresponse.data.file_id,
    });
  };

  render() {
    return this.state.stylized ? (
      <ResultImage file_id={this.state.resultId} reset={this.props.reset} />
    ) : (
      <SuccessfulUpload
        file_id={this.props.file_id}
        handleSupersize={this.handleSupersize}
        handleStylize={this.handleStylize}
      />
    );
  }
}

export default ImagePage;
