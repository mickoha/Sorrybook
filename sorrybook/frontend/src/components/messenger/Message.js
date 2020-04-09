import React from "react";
import { connect } from "react-redux";

const Message = (props) => {
  // Make time
  const date = props.content.created_at.split("T");
  const time = date[1].split(".");

  const styleOwn = {
    marginTop: "5px",
    width: "100%",
    textAlign: "left",
    lineHeight: "80%",
    paddingLeft: "10px",
    backgroundColor: "#ccffee",
    paddingBottom: "5px",
  };

  const styleOther = {
    marginTop: "5px",
    width: "100%",
    textAlign: "right",
    backgroundColor: "#a3c2c2",
    lineHeight: "80%",
    paddingRight: "10px",
    paddingBottom: "5px",
  };

  if (props.authReducer.user === null) {
    return <h3>Loading...</h3>;
  }

  return (
    <div>
      {props.authReducer.user.username === props.content.username ? (
        <div key={props.content.id} style={styleOwn}>
          <h5>{props.content.username}</h5>
          <p>{props.content.content}</p>
          <span style={{ fontSize: "80%" }}>
            {date[0]} {time[0]}{" "}
          </span>
        </div>
      ) : (
        <div key={props.content.id} style={styleOther}>
          <h5>{props.content.username}</h5>
          <p>{props.content.content}</p>
          <span style={{ fontSize: "80%" }}>
            {date[0]} {time[0]}{" "}
          </span>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  authReducer: state.authReducer,
});

export default connect(mapStateToProps)(Message);
