import React, { useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { registerUser } from "../../services/auth";
import { createMessage } from "../../services/messages";

const Register = props => {
  const [information, setInformation] = useState({
    username: "",
    email: "",
    password1: "",
    password2: ""
  });

  const handleSubmit = e => {
    e.preventDefault();
    if (information.password1 !== information.password2) {
      props.createMessage({ passwordsNotMatch: "Passwords do not match" });
    } else {
      const user = {
        username: information.username,
        password: information.password1,
        email: information.email
      };

      props.registerUser(user);
    }
  };

  const handleChange = e => {
    setInformation({ ...information, [e.target.name]: e.target.value });
  };

  if (props.authReducer.isAuthenticated) {
    return <Redirect to={`profile/${props.authReducer.user.id}`} />;
  }

  return (
    <div>
      <div className="col-md-6 m-auto">
        <div className="card card-body mt-5">
          <h2 className="text-center">Register</h2>
          <form onSubmit={e => handleSubmit(e)}>
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                className="form-control"
                name="username"
                onChange={e => handleChange(e)}
                value={information.username}
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                onChange={e => handleChange(e)}
                value={information.email}
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                name="password1"
                onChange={e => handleChange(e)}
                value={information.password1}
              />
            </div>
            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                className="form-control"
                name="password2"
                onChange={e => handleChange(e)}
                value={information.password2}
              />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary">
                Register
              </button>
            </div>
            <p>
              Already have an account? <a href="/login">Login</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  authReducer: state.authReducer
});

export default connect(mapStateToProps, { registerUser, createMessage })(
  Register
);
