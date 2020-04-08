import React from "react";
import { connect } from "react-redux";
import { logoutUser } from "../../services/auth";

const Header = (props) => {
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
            {props.authReducer.isAuthenticated ? (
              <a
                className="nav-item nav-link"
                href={`/profile/${props.authReducer.user.id}`}
              >
                Profile
              </a>
            ) : (
              <a className="nav-item nav-link" href="/register">
                Register
              </a>
            )}
            {props.authReducer.isAuthenticated ? (
              <a
                className="nav-item nav-link"
                onClick={props.logoutUser}
                href="/"
              >
                Logout
              </a>
            ) : (
              <a className="nav-item nav-link" href="/login">
                Login
              </a>
            )}

            {props.authReducer.isAuthenticated && (
              <a className="nav-item nav-link" href="/messenger">
                Messenger
              </a>
            )}

            {props.authReducer.isAuthenticated && (
              <span className="navbar-text mg-10 pull-right">
                <strong>Logged in as {props.authReducer.user.username}</strong>
              </span>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

const mapStateToProps = (state) => ({
  authReducer: state.authReducer,
});

export default connect(mapStateToProps, { logoutUser })(Header);
