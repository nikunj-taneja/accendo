import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from "./Header";
import Gallery from "./Gallery";
import ProfileWrapper from "./ProfileWrapper";
import SignUp from "./SignUp";
import UserPage from "./UserPage";

import "../styles/App.css";

import AuthContext from "./AuthContext";

import { Container } from "react-bootstrap";

class App extends React.Component {
  static contextType = AuthContext;

  render() {
    return (
      <Router>
        <Header />

        <Container className="main-body">
          <Switch>
            <Route path="/" exact>
              {this.context.isAuth ? <ProfileWrapper /> : <UserPage />}
            </Route>
            <Route path="/communitygallery" exact component={Gallery} />
            <Route path="/profile" exact component={ProfileWrapper} />
            <Route path="/signup" exact component={SignUp} />
          </Switch>
        </Container>
      </Router>
    );
  }
}

export default App;
