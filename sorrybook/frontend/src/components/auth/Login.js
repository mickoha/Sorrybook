import React, { useState } from "react";
import Link from "react-router-dom";

const Login1 = props => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  });

  const handleChange = e => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log("login");
  };
  return (
    <div className="col-md-6 m-auto">
      <div className="card card-body mt-5">
        <h2 className="text-center">Login</h2>
        <form onSubmit={e => handleSubmit(e)}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              className="form-control"
              name="username"
              onChange={e => handleChange(e)}
              value={credentials.username}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              onChange={e => handleChange(e)}
              value={credentials.password}
            />
          </div>

          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </div>
          <p>
            Don't have an account? <a href="/register">Register</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login1;
