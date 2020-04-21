import React from "react";
import Masonry from "react-masonry-component";

import "../styles/Gallery.css";

const masonryOptions = {
  columnWidth: 300,
  isFitWidth: true,
  gutter: 5,
};

//Currently hardcoded, should use the CommunityGallery class along with the backend to load images when done
const imageList = [
  "https://images.unsplash.com/photo-1585157603253-7b3e36555495",
  "https://images.unsplash.com/photo-1585224489070-cde3c0025afa",
  "https://images.unsplash.com/photo-1585273556133-cd9dc72729dd",
  "https://images.unsplash.com/photo-1585262365027-bc3df8d5ef45",
  "https://images.unsplash.com/photo-1585264055943-5ed7dfc1ef4d",
  "https://images.unsplash.com/photo-1585131702297-a4330318f429",
  "https://images.unsplash.com/photo-1558981396-5fcf84bdf14d",
  "https://images.unsplash.com/photo-1585270042046-89ea30bf8864",
  "https://images.unsplash.com/photo-1585269668044-37b6bc16461d",
  "https://images.unsplash.com/photo-1585251263786-24394eda0848",
  "https://images.unsplash.com/photo-1585251068848-d3ddf9ea80f1",
  "https://images.unsplash.com/photo-1585278035541-95f36a8e48da",
  "https://images.unsplash.com/photo-1585068026990-77727560c45d",
  "https://images.unsplash.com/photo-1585194328939-96958e7d3e87",
  "https://images.unsplash.com/photo-1585193470397-93e019b1a211",
];

class Gallery extends React.Component {
  render() {
    return (
      <Masonry
        className="masonry-grid"
        elementType="div"
        options={masonryOptions}
        disableImagesLoaded={false}
      >
        {imageList.map((link, index) => {
          return (
            <div className="grid-img" key={index}>
              <img src={link} style={{ width: 300 }} />
            </div>
          );
        })}
      </Masonry>
    );
  }
}

export default Gallery;
