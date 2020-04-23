import React from "react";
import { Image, Container, Col } from "react-bootstrap";
import "../styles/ImageCard.css";
import { FaHeart } from "react-icons/fa";
import AuthContext from "./AuthContext";

class ImageCard extends React.Component {
  static contextType = AuthContext;
  static img = this.props.img;

  like = () => {
    this.img.like_count++;
    this.img.likes.push(this.context.username);
  };

  render() {
    return (
      <div className="imgCard">
        <img className="innerImg" src={this.img.image_url} />
        <br />
        <div>
          <h5 style={{ display: "inline" }} className="likeCount">
            Likes: {this.img.like_count}
          </h5>
          {this.context.isAuth ? (
            <FaHeart
              style={{ position: "absolute", right: 20, bottom: 10 }}
              size="1.2em"
              color={
                this.img.likes.includes(this.context.username)
                  ? "#28b161"
                  : "#black"
              }
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
