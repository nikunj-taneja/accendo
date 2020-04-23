import React from "react";
import axios from "axios";

import AuthContext from "./AuthContext";
import LoadingOverlay from "react-loading-overlay";

import App from "./App";

class AppProvider extends React.Component {
  state = {
    isAuth: false,
    isWaiting: false,
    username: null,
    communityImages: [],
    userImages: [],
  };

  setWaiting = (waiting) => {
    this.setState({ isWaiting: waiting });
  };

  getCommunityImages = async () => {
    this.setWaiting(true);

    const response = await axios.get("/community");

    console.log(response);

    this.setState({
      communityImages: response.data.images,
    });
    this.setWaiting(false);
  };

  getUserImages = async () => {
    this.setWaiting(true);

    const response = await axios.get(`/gallery/${this.state.username}`);

    console.log(response);

    this.setState({
      userImages: response.data.images,
    });
    this.setWaiting(false);
  };

  login = async (username, password) => {
    this.setWaiting(true);

    var data = new FormData();

    data.set("username", username);
    data.set("password", password);

    const response = await axios({
      method: "post",
      url: "/login",
      data: data,
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (response.data.status === 200) {
      this.setState({
        isAuth: true,
        isWaiting: false,
        username: username,
      });
      console.log("Logged In!");
    } else {
      this.setWaiting(false);
      console.log("Login Failed");
    }
  };

  register = async (username, email, password) => {
    this.setState({ isWaiting: true });

    var data = new FormData();
    data.set("username", username);
    data.set("email", email);
    data.set("password", password);

    const response = await axios({
      method: "post",
      url: "/register",
      data: data,
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (response.data.status === 200) {
      this.setState({ isAuth: true, isWaiting: false, username: username });
      console.log("Registered Successfully!");
    } else {
      this.setState({ isWaiting: false });
      console.log("Sign Up Failed");
    }
  };

  logout = () => {
    this.setState({
      userImages: [],
      username: null,
      isAuth: false,
    });
  };

  render() {
    return (
      <LoadingOverlay
        styles={{
          wrapper: (base) => ({ ...base, height: "100%" }),
        }}
        active={this.state.isWaiting}
        spinner
        text="Working..."
      >
        <AuthContext.Provider
          value={{
            ...this.state,
            login: this.login,
            register: this.register,
            logout: this.logout,
            setWaiting: this.setWaiting,
            getCommunityImages: this.getCommunityImages,
            getUserImages: this.getUserImages,
          }}
        >
          <App />
        </AuthContext.Provider>
      </LoadingOverlay>
    );
  }
}

export default AppProvider;
