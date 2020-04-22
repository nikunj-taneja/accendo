import React from "react";
import axios from "axios";

import AuthContext from "./AuthContext";
import App from "./App";

class AppProvider extends React.Component {
  state = {
    isAuth: false,
    isWaiting: false,
    username: null,
  };

  login = async (username, password) => {
    this.setState({ isWaiting: true });

    var data = new FormData();

    data.set("username", username);
    data.set("password", password);

    const response = await axios({
      method: "post",
      url: "/login",
      data: data,
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (response.data.status == "200") {
      this.setState({
        isAuth: true,
        isWaiting: false,
        username: username,
      });
      console.log("Logged In!");
    } else {
      this.setState({ isWaiting: false });
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

    if (response.data.status == "200") {
      this.setState({ isAuth: true, isWaiting: false, username: username });
      console.log("Registered Successfully!");
    } else {
      this.setState({ isWaiting: false });
      console.log("Sign Up Failed");
    }
  };
  logout = () => {};

  render() {
    return (
      <AuthContext.Provider
        value={{
          ...this.state,
          login: this.login,
          register: this.register,
          logout: this.logout,
        }}
      >
        <App />
      </AuthContext.Provider>
    );
  }
}

export default AppProvider;
