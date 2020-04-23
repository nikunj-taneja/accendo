import React from "react";
import Masonry from "react-masonry-component";

import "../styles/CommunityGallery.css";

import { Container } from "react-bootstrap";
import AuthContext from "./AuthContext";
import ImageCard from "./ImageCard";

const masonryOptions = {
  columnWidth: 0,
  isFitWidth: true,
  gutter: 2,
};

class CommunityGallery extends React.Component {
  state = { init: false, images: [] };
  static contextType = AuthContext;

  componentWillMount() {
    if (!this.state.init) this.getImages();
  }

  getImages = async () => {
    this.setState({ init: true });
    await this.context.getCommunityImages();

    this.setState({ init: true, images: this.context.communityImages });
  };

  render() {
    return (
      <div>
        <h1 className="bodyText mb-5">Community Images:</h1>
        <Masonry
          className="masonry-grid"
          elementType="div"
          options={masonryOptions}
          disableImagesLoaded={false}
        >
          {this.state.images.map((obj, index) => {
            return (
              <div className="grid-img" key={index}>
                <ImageCard img={obj} />
              </div>
            );
          })}
        </Masonry>
      </div>
    );
  }
}

export default CommunityGallery;
