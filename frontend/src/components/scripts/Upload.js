import React from "react";

import { Image, Container, Button, Spinner } from "react-bootstrap";
import Dropzone from "react-dropzone";

import AuthContext from "./AuthContext";
import Masonry from "react-masonry-component";

const masonryOptions = {
  columnWidth: 300,
  isFitWidth: true,
  gutter: 5,
};

class Upload extends React.Component {
  state = {
    file: null,
    loading: false,
    selected: false,
    loadedFile: null,
    init: false,
    images: [],
  };

  static contextType = AuthContext;

  componentWillMount() {
    if (!this.state.init) this.getImages();
  }

  getImages = async () => {
    this.setState({ init: true });
    await this.context.getUserImages();

    this.setState({ init: true, images: this.context.userImages });
  };

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

  submit = () => {
    this.props.handleSubmit(this.state.file);
  };

  render() {
    var imgs;
    if (this.state.images.length > 0) {
      imgs = (
        <div>
          <h1 className="bodyText mb-5">User Images:</h1>
          <Masonry
            className="masonry-grid"
            elementType="div"
            options={masonryOptions}
            disableImagesLoaded={false}
          >
            {this.state.images.map((obj, index) => {
              return (
                <div className="grid-img" key={index}>
                  <Image
                    rounded
                    alt={obj.image_url}
                    src={obj.image_url}
                    style={{ width: 300 }}
                  />
                </div>
              );
            })}
          </Masonry>
        </div>
      );
    } else {
      imgs = <h1>No Images Yet!</h1>;
    }

    return (
      <Container className="m-10">
        {imgs}
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
        <Button size="lg" block className="mt-3" onClick={this.submit}>
          Upload
        </Button>
      </Container>
    );
  }
}

export default Upload;
