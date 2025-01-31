import React, { useState } from "react";
import { connect } from "react-redux";
import { deleteSorry, likeSorry } from "../../services/sorryService";
import { getComments } from "../../services/comments";
import { useWindowSize } from "../layout/size";

const Sorry = (props) => {
  if (!props.usersReducer.users) {
    return <h2>Loading...</h2>;
  } else {
    // Setup apologist
    var apologist = "himself";
    if (props.content.apologist !== "") {
      apologist = props.content.apologist;
    }

    // Make time
    const date = props.content.created_at.split("T");
    const time = date[1].split(".");

    const handleCommentsOpen = (e) => {
      const content = {
        sorry: props.content,
        username: username,
        comments: null,
      };

      props.getComments(content);
    };

    const handleDelete = (e) => {
      e.preventDefault();
      props.deleteSorry(props.content.id);
    };

    const handleLike = (e) => {
      e.preventDefault();
      props.likeSorry(props.content.id);
    };

    var classes = {};

    const sizes = useWindowSize();
    if (sizes[0] > 319) {
      classes = {
        ...classes,
        likeButton: "col-4",
        likes: "col-4",
        comments: "col-7",
        time: "col-6",
        content: "col-8",
      };
    }

    if (sizes[0] > 580) {
      classes = {
        ...classes,
        likeButton: "col-2",
        likes: "col-2",
        comments: "col-4",
        time: "col-4",
        content: "col-10",
      };
    }

    var username = "";

    const user = props.usersReducer.users.find(
      (user) => user.id === props.content.owner
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
              onClick={(e) => handleDelete(e)}
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
          <div className={classes.likeButton}>
            <button type="button" className="btn btn-primary" disabled>
              like
            </button>
          </div>
        );
      }

      if (props.content.likes.includes(props.authReducer.user.id)) {
        return (
          <div className={classes.likeButton}>
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
          <div className={classes.likeButton}>
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
      <div>
        <div className="card">
          <div className="card-body">
            <div className="container">
              <div className="row justify-content-md-start">
                <div className={classes.content}>
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
                <div className={classes.likes}>
                  {props.content.likes.length} likes
                </div>
                <div className={classes.comments}>
                  {props.content.comments} comments
                </div>
              </div>
              <div
                style={{ paddingTop: "5px", borderTop: "1px solid black" }}
                className="row justify-content-md-start"
              >
                {likeButton()}
                <div className="col-6">
                  <button
                    type="button"
                    className="btn btn-outline-primary"
                    name={props.content.id}
                    onClick={(e) => handleCommentsOpen(e)}
                    data-toggle="modal"
                    data-target="#commentModal"
                  >
                    comment
                  </button>
                </div>
                <div className={classes.time}>
                  {date[0]} {time[0]}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state) => ({
  usersReducer: state.usersReducer,
  authReducer: state.authReducer,
  commentsReducer: state.commentsReducer,
});

export default connect(mapStateToProps, {
  likeSorry,
  deleteSorry,
  getComments,
})(Sorry);
