import React, { Component } from "react";

const Header = props => {
  const profileID = 1;
  return (
    <div style={{ maxWidth: "1000px" }} className="container">
      <nav className="navbar navbar-expand-sm navbar-light bg-light">
        <a className="navbar-brand" href="/">
          Sorrybook
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <a className="nav-item nav-link" href="/">
              Sorries <span className="sr-only">(current)</span>
            </a>
            <a className="nav-item nav-link" href={`/profile/${profileID}`}>
              Profile
            </a>
            <a className="nav-item nav-link" href="/register">
              Register
            </a>
            <a className="nav-item nav-link" href="/login">
              Login
            </a>
            <a className="nav-item nav-link" href="/">
              Logout
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
