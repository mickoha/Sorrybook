import React from "react";
import { connect } from "react-redux";

import { deleteComment } from "../../services/comments";

const Comment = (props) => {
  const date = props.content.created_at.split("T");
  const time = date[1].split(".");

  const handleDelete = (e) => {
    e.preventDefault();
    props.deleteComment(props.content.id);
  };

  const deleteButton = () => {
    if (props.authReducer.isAuthenticated) {
      if (props.authReducer.user.id === props.content.owner) {
        return (
          <div className="col-2">
            <button
              type="button"
              className="btn btn-danger btn-sm"
              onClick={(e) => handleDelete(e)}
            >
              delete
            </button>
          </div>
        );
      }
    }
  };
  return (
    <div>
      <div className="row justify-content-md-start">
        <div className="col-4">
          <a href={`profile/${props.content.owner}`}>
            <h5>
              <u>{props.content.username}</u>
            </h5>
          </a>
        </div>
        <div className="col-6">
          <p>
            {date[0]} {time[0]}
          </p>
        </div>
        {deleteButton()}
      </div>
      <p>{props.content.content}</p>
    </div>
  );
};

const mapStateToProps = (state) => ({
  authReducer: state.authReducer,
});

export default connect(mapStateToProps, { deleteComment })(Comment);
