import React from "react";
import { connect } from "react-redux";

const Banner = props => {
  const newPostButton = () => {
    if (!props.authReducer.isAuthenticated) {
      return <div className="col-6"></div>;
    } else {
      return (
        <div style={{ paddingTop: "5px" }} className="col-6">
          <button
            type="button"
            className="btn btn-primary"
            data-toggle="modal"
            data-target="#newSorryModal"
          >
            New post
          </button>
        </div>
      );
    }
  };
  return (
    <div style={{ margin: "auto", maxWidth: "700px" }} className="container">
      <div className="row justify-content-md-start">
        <div className="col-3">
          <h2>Sorries</h2>
        </div>
        {newPostButton()}
        <div style={{ paddingTop: "5px" }} className="dropdown">
          <button
            className="btn btn-outline-info dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Sort by
          </button>
          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <a className="dropdown-item" href="#">
              Time
            </a>
            <a className="dropdown-item" href="#">
              Likes
            </a>
            <a className="dropdown-item" href="#">
              Followed
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  authReducer: state.authReducer
});

export default connect(mapStateToProps)(Banner);
