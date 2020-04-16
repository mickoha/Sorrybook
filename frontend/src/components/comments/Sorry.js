import React from "react";
import { connect } from "react-redux";

const Sorry = props => {
  var likes;
  if (props.commentsReducer.sorry.likes) {
    likes = props.commentsReducer.sorry.likes.length;
  }
  return (
    <div className="card">
      <div className="card-body">
        <div className="container">
          <div className="row justify-content-md-start">
            <div className="col-10">
              <h3>
                <a href={`profile/${props.commentsReducer.sorry.owner}`}>
                  <u>{props.commentsReducer.username}</u>
                </a>{" "}
                as <i>{props.commentsReducer.sorry.apologist}</i>
              </h3>
            </div>
          </div>

          <h4>Sorry</h4>
          <p style={{ fontSize: "1.5em" }} className="card-text">
            for {props.commentsReducer.sorry.content}
          </p>
          <div className="row justify-content-md-start">
            <div className="col-3">{likes} likes</div>
            <div className="col-4">
              {props.commentsReducer.sorry.comments} comments
            </div>
          </div>
          <div
            style={{
              paddingTop: "5px",
              borderTop: "1px solid black"
            }}
            className="row justify-content-md-start"
          ></div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  commentsReducer: state.commentsReducer
});

export default connect(mapStateToProps)(Sorry);
