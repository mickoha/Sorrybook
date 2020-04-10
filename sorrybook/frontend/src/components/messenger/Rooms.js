import React from "react";
import { connect } from "react-redux";

import { currentRoom } from "../../services/messenger";

import User from "./User";

const Rooms = (props) => {
  const handleChatRoom = (chatId) => {
    props.currentRoom(chatId);
  };

  return (
    <div
      className="col-4"
      style={{
        height: "600px",
        maxWidth: "200px",
      }}
    >
      <div
        style={{
          textAlign: "center",
          paddingTop: "20px",
          height: "80px",
        }}
      >
        <button
          type="button"
          className="btn btn-primary"
          data-toggle="modal"
          data-target="#newChatModal"
        >
          Start a room
        </button>
      </div>
      <div style={{ overflowY: "scroll", maxHeight: "450px" }}>
        <h2>Chat rooms</h2>
        {props.messengerReducer === null && <h2>Loading...</h2>}
        {props.messengerReducer !== null &&
          props.messengerReducer.length === 0 && (
            <h2>Please, start a conversation</h2>
          )}

        {props.messengerReducer !== null &&
          props.messengerReducer.length !== 0 &&
          props.messengerReducer.map((room) => {
            if (room.id === props.test) {
              return (
                <div
                  type="button"
                  key={room.id}
                  onClick={() => handleChatRoom(room.id)}
                  style={{
                    backgroundColor: "#00ffaa",
                    padding: "10px",
                    margin: "10px",
                  }}
                  data-toggle="modal"
                  data-target="#chatTableModal"
                >
                  <User
                    authUser={props.authReducer.user.username}
                    content={room}
                  />
                </div>
              );
            }
            return (
              <div
                type="button"
                key={room.id}
                onClick={() => handleChatRoom(room.id)}
                style={{
                  backgroundColor: "#7FFFD4",
                  padding: "10px",
                  margin: "10px",
                }}
              >
                <User
                  authUser={props.authReducer.user.username}
                  content={room}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  authReducer: state.authReducer,
  messengerReducer: state.messengerReducer.chatrooms,
  test: state.messengerReducer.currentRoom,
});

export default connect(mapStateToProps, { currentRoom })(Rooms);
