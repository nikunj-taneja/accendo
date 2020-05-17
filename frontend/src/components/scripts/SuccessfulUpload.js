import React from "react";

import { Container, Button, Tab, Tabs, Row, Col, Image } from "react-bootstrap";

import "../styles/ImagePage.css";

//Shows the user's uploaded image and gives them the option to either stylize
//or supersize.
class SuccessfulUpload extends React.Component {
  state = {
    key: "supersize",
    selected_index: null,
    selected_img_link: "",
  };

  imageClick = (index) => {
    this.setState({
      selected_index: index,
      selected_img_link:
        process.env.PUBLIC_URL + "style_images/style_img" + index + ".jpg",
    });
  };

  render() {
    const images = [];

    for (var i = 0; i <= 7; i++) {
      images.push(
        process.env.PUBLIC_URL + "style_images/style_img" + i + ".jpg"
      );
    }

    const img = (
      <img
        style={{ maxWidth: "100%", maxHeight: 400, marginTop: 10 }}
        src={`/file/${this.props.file_id}`}
      ></img>
    );

    return (
      <Container
        style={{ background: "#141e30", padding: 20, borderRadius: 20 }}
        className="text-center"
      >
        <h3>Your image has been uploaded!</h3>
        <Tabs
          className="tabs"
          activeKey={this.state.key}
          onSelect={(k) => this.setState({ key: k })}
        >
          <Tab eventKey="supersize" title="Supersize">
            {img}
            <Button
              size="lg"
              block
              className="mt-3"
              onClick={this.props.handleSupersize}
            >
              Supersize
            </Button>
          </Tab>
          <Tab eventKey="stylize" title="Stylize">
            {img}
            <h4 style={{ margin: 5 }}>Choose Style Image:</h4>
            <Container>
              <Row noGutters className="justify-content-center">
                {images.map((item, index) => (
                  <Col md="auto" key={index} className="imgCol">
                    <Image
                      onClick={() => this.imageClick(index)}
                      rounded
                      fluid
                      src={item}
                      className={`presetStyleImg ${
                        index === this.state.selected_index
                          ? "selectedStyleImg"
                          : ""
                      }`}
                    />
                  </Col>
                ))}
              </Row>
            </Container>
            <Button
              disabled={this.state.selected_index === null}
              size="lg"
              block
              className="mt-3"
              onClick={() =>
                this.props.handleStylize(this.state.selected_img_link)
              }
            >
              Stylize
            </Button>
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

export default SuccessfulUpload;
