import React from "react";
import { Image, Container, Col } from "react-bootstrap";
import "../styles/ImageCard.css";
import { FaHeart } from "react-icons/fa";
import AuthContext from "./AuthContext";
import axios from "axios";

class ImageCard extends React.Component {
  state = { liked: false };

  static contextType = AuthContext;

  componentWillMount() {
    this.img = this.props.img;

    this.state.liked = this.img.likes.includes(this.context.username);
  }

  like = () => {
    if (!this.state.liked) {
      this.img.like_count++;
      this.img.likes.push(this.context.username);
      this.setState({ liked: true });
    } else {
      this.img.like_count--;
      var index = this.img.likes.indexOf(this.context.username);
      this.img.likes.splice(index, 1);
      this.setState({ liked: false });
    }

    var data = new FormData();
    data.set("username", this.context.username);
    data.set("file_id", this.img.file_id);
    axios({
      method: "post",
      url: "/like",
      data: data,
      headers: { "Content-Type": "multipart/form-data" },
    });
  };

  render() {
    return (
      <div className="imgCard">
        <img className="innerImg" src={"/file/" + this.img.file_id} />
        <br />
        <div className="bottomSection">
          <h6 style={{ display: "inline" }} className="likeCount">
            Likes: {this.img.like_count}
          </h6>
          {this.context.isAuth ? (
            <FaHeart
              style={{
                position: "absolute",
                right: 20,
                bottom: 15,
                color: this.state.liked ? "#28b161" : "#243b55",
              }}
              size="1.3em"
              onClick={this.like}
            />
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}

export default ImageCard;
