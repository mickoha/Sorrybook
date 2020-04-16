import React, { Fragment } from "react";
import { connect } from "react-redux";

import NewComment from "./NewComment";
import Comment from "./Comment";
import Sorry from "./Sorry";

const Comments = (props) => {
  var likes;
  if (props.commentsReducer.sorry.likes) {
    likes = props.commentsReducer.sorry.likes.length;
  }

  return (
    <div>
      <div
        className="modal fade"
        id="commentModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="commentModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Add comment</h2>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              {props.authReducer.isAuthenticated && (
                <NewComment id={props.commentsReducer.sorry.id} />
              )}
              <Sorry />
              {props.commentsReducer.comments != null &&
                props.commentsReducer.comments.length === 0 && (
                  <h3>No comments yet... Add some!</h3>
                )}

              {props.commentsReducer.comments != null &&
                props.commentsReducer.comments.length !== 0 && (
                  <ul className="list-group">
                    {props.commentsReducer.comments.map((comment) => (
                      <li className="list-group-item" key={comment.id}>
                        <Comment content={comment} />
                      </li>
                    ))}
                  </ul>
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  commentsReducer: state.commentsReducer,
  authReducer: state.authReducer,
});

export default connect(mapStateToProps)(Comments);
