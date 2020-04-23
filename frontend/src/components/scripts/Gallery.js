import React from "react";
import Masonry from "react-masonry-component";

import "../styles/CommunityGallery.css";

import { Container } from "react-bootstrap";
import AuthContext from "./AuthContext";

const masonryOptions = {
  columnWidth: 300,
  isFitWidth: true,
  gutter: 5,
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
      <Container>
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
                <img
                  alt={obj.image_url}
                  src={obj.image_url}
                  style={{ width: 300 }}
                />
              </div>
            );
          })}
        </Masonry>
      </Container>
    );
  }
}

export default CommunityGallery;
