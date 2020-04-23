import React from "react";

import AuthContext from "./AuthContext";
import Profile from "./Profile";

class ProfileWrapper extends React.Component {
  static contextType = AuthContext;

  render() {
    return this.context.isAuth ? (
      <Profile />
    ) : (
      <h1 className="bodyText">Please login to see your gallery!</h1>
    );
  }
}

export default ProfileWrapper;
