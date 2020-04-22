import React from "react";

import { Container, Button, Spinner } from "react-bootstrap";
import Dropzone from "react-dropzone";

class Upload extends React.Component {
  state = {
    file: null,
    loading: false,
    selected: false,
    loadedFile: null,
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
    return (
      <Container>
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
