import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from "./Header";
import Gallery from "./Gallery";
import Profile from "./Profile";
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
            <Route path="/" exact={true}>
              {this.context.isAuth ? <Profile /> : <UserPage />}
            </Route>
            <Route path="/gallery">
              <Gallery />
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
            <Route path="/signup">
              <SignUp />
            </Route>
          </Switch>
        </Container>
      </Router>
    );
  }
}

export default App;
