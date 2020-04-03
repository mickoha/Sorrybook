import React from "react";
import { connect } from "react-redux";
import { deleteSorry, likeSorry } from "../../services/sorryService";

const Sorry = props => {
  var apologist = "himself";
  if (props.content.apologist !== "") {
    apologist = props.content.apologist;
  }

  const date = props.content.created_at.split("T");
  const time = date[1].split(".");

  const handleDelete = e => {
    e.preventDefault();
    props.deleteSorry(props.content.id);
  };

  const handleLike = e => {
    e.preventDefault();
    props.likeSorry(props.content.id);
  };

  var username = "";
  // If users not ready, return loading
  if (!props.usersReducer.users) {
    return <h2>Loading...</h2>;
  } else {
    const user = props.usersReducer.users.find(
      user => user.id === props.content.owner
    );
    username = user.username;

    // Show deletebutton if User is content owner
    const deleteButton = () => {
      if (!props.authReducer.isAuthenticated) {
        return <div className="col-2"></div>;
      }

      if (user.id === props.authReducer.user.id) {
        return (
          <div className="col-2">
            <button
              onClick={e => handleDelete(e)}
              type="button"
              className="btn btn-outline-danger"
            >
              delete
            </button>
          </div>
        );
      }
    };

    const likeButton = () => {
      if (!props.authReducer.isAuthenticated) {
        return (
          <div className="col-2">
            <button type="button" className="btn btn-primary" disabled>
              like
            </button>
          </div>
        );
      }

      if (props.content.likes.includes(props.authReducer.user.id)) {
        return (
          <div className="col-2">
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleLike}
            >
              unlike
            </button>
          </div>
        );
      } else {
        return (
          <div className="col-2">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleLike}
            >
              like
            </button>
          </div>
        );
      }
    };
    return (
      <div className="card">
        <div className="card-body">
          <div className="container">
            <div className="row justify-content-md-start">
              <div className="col-10">
                <h3>
                  <a href={`profile/${props.content.owner}`}>
                    <u>{username}</u>
                  </a>{" "}
                  as <i>{apologist}</i>
                </h3>
              </div>
              {deleteButton()}
            </div>

            <h4>Sorry</h4>
            <p style={{ fontSize: "1.5em" }} className="card-text">
              for {props.content.content}
            </p>
            <div className="row justify-content-md-start">
              <div className="col-2">{props.content.likes.length} likes</div>
            </div>
            <div
              style={{ paddingTop: "5px", borderTop: "1px solid black" }}
              className="row justify-content-md-start"
            >
              {likeButton()}
              <div className="col-6">
                <button type="button" className="btn btn-outline-primary">
                  comment
                </button>
              </div>
              <div className="col-4">
                {date[0]} {time[0]}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

const mapStateToProps = state => ({
  usersReducer: state.usersReducer,
  authReducer: state.authReducer
});

export default connect(mapStateToProps, { likeSorry, deleteSorry })(Sorry);
