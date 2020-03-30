import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

const Profile = props => {
  console.log(props);
  return (
    <div>
      <p>moi</p>
    </div>
  );
};

const mapStateToProps = state => ({
  authReducer: state.authReducer
});

export default connect(mapStateToProps)(Profile);
