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
          <h3 className="bodyText mb-5">Your Images:</h3>
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
                    src={"/file/" + obj.file_id}
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
        <h3 className="pb-4">Add Image: </h3>
        <Dropzone onDrop={this.handleDrop} accept="image/*">
          {({ getRootProps, getInputProps }) => (
            <section>
              <div {...getRootProps({ className: "dropzone" })}>
                <input {...getInputProps()} />

                <p>
                  Drag 'n' drop some your image here, or just click anywhere to
                  select one!
                </p>
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
        <div style={{ marginTop: 25 }}>{imgs}</div>
      </Container>
    );
  }
}

export default Upload;
