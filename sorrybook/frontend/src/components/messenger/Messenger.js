import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { getChatRooms } from "../../services/messenger";

import Chat from "./Chat";
import User from "./User";

const Messenger = (props) => {
  const [chatRoom, setChatRoom] = useState(null);
  useEffect(() => {
    props.getChatRooms();
  }, []);

  return (
    <div
      style={{ paddingTop: "10px", margin: "auto", maxWidth: "700px" }}
      className="container"
    >
      <div className="card">
        <div className="card-body">
          <h2>Messenger</h2>
          <div className="row justify-content-md-start">
            <div
              className="col-4"
              style={{
                height: "600px",
                maxWidth: "200px",
              }}
            >
              <div style={{ border: "1px solid", height: "100px" }}>
                <p>search here</p>
              </div>
              <h2>Chat rooms</h2>
              {props.messengerReducer === null && <h2>Loading...</h2>}
              {props.messengerReducer !== null &&
                props.messengerReducer.length === 0 && (
                  <h2>Please, start a conversation</h2>
                )}

              {props.messengerReducer !== null &&
                props.messengerReducer.length !== 0 &&
                props.messengerReducer.map((room) => {
                  return (
                    <div
                      type="button"
                      key={room.id}
                      onClick={() => setChatRoom(room.id)}
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

            <Chat chatRoom={chatRoom} />
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
