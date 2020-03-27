import React, { useState } from "react";

const Register = props => {
  const [information, setInformation] = useState({
    username: "",
    email: "",
    password1: "",
    password2: ""
  });

  const handleSubmit = e => {
    e.preventDefault();
    console.log("register");
  };

  const handleChange = e => {
    setInformation({ ...information, [e.target.name]: [e.target.value] });
  };
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

export default Register;
