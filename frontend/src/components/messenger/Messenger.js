import React, { useEffect } from "react";
import { connect } from "react-redux";

import { getChatRooms } from "../../services/messenger";

import { Redirect } from "react-router-dom";

import Chat from "./Chat";
import Rooms from "./Rooms";
import NewChat from "./NewChat";

const Messenger = (props) => {
  useEffect(() => {
    props.getChatRooms();
  }, []);

  if (props.authReducer.token === null) {
    return <Redirect to="/login" />;
  }

  return (
    <div
      style={{ paddingTop: "10px", margin: "auto", maxWidth: "700px" }}
      className="container"
    >
      <NewChat />

      <div className="card">
        <div className="card-body">
          <h2>Messenger</h2>
          <div className="row justify-content-md-start">
            <Rooms />
            <Chat />
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  authReducer: state.authReducer,
  messengerReducer: state.messengerReducer.chatrooms,
});

export default connect(mapStateToProps, { getChatRooms })(Messenger);
