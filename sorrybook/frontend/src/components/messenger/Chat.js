import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { setMessages, newMessage } from "../../services/messenger";
import { useWindowSize } from "../layout/size";

import Message from "./Message";

import WebSocketInstance from "../websocket";

const Chat = (props) => {
  const [loaded, setLoaded] = useState(false);
  const [message, setMessage] = useState("");
  const [roomLoaded, setRoomLoaded] = useState(false);
  const [lastRoom, setLastRoom] = useState(null);

  //Socket connection
  const waitForSocketConnection = (callback) => {
    setTimeout(function () {
      console.log(WebSocketInstance.state());
      if (WebSocketInstance.state() === 1) {
        console.log("Connection is made");
        callback();
        return;
      } else {
        console.log("wait for connection...");
        waitForSocketConnection(callback);
      }
    }, 100);
  };

  if (props.messengerReducer.currentRoom !== lastRoom && roomLoaded) {
    WebSocketInstance.disconnect();
    setRoomLoaded(false);
  }

  if (props.messengerReducer.currentRoom !== null && !roomLoaded) {
    waitForSocketConnection(() => {
      setLoaded(true);
    });

    WebSocketInstance.connect(props.messengerReducer.currentRoom);
    setRoomLoaded(true);
    setLastRoom(props.messengerReducer.currentRoom);
  }

  if (loaded) {
    WebSocketInstance.fetchMessages(
      props.authReducer.user.username,
      props.messengerReducer.currentRoom
    );
    setLoaded(false);
  }

  WebSocketInstance.addCallbacks(props.setMessages, props.newMessage);

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const sendMessage = (e) => {
    e.preventDefault();
    const messageObject = {
      from: props.authReducer.user.username,
      content: message,
      chatId: props.messengerReducer.currentRoom,
    };

    WebSocketInstance.newChatMessage(messageObject);
    setMessage("");
  };

  const scrollBot = () => {
    const table = document.getElementById("messageTable");
    table.scrollTop = table.scrollHeight;
  };

  if (props.messengerReducer.messages !== null) {
    setTimeout(scrollBot, 1000);
  }

  var size = useWindowSize();
  if (size[0] < 500) {
    return (
      <div
        className="col-8"
        style={{
          height: "600px",
          padding: "0 10px",
        }}
      >
        <div
          className="modal fade"
          id="chatTableModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="chatTableModal"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h3 className="modal-title" id="chatTableModalyes">
                  Chat room
                </h3>
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
                <div
                  id="messageTable"
                  style={{
                    backgroundColor: "#7FFFD4",
                    height: "530px",
                    overflowY: "scroll",
                  }}
                >
                  {props.messengerReducer.currentRoom === null && (
                    <h1 style={{ paddingTop: "200px" }}>
                      Please, select chat room
                    </h1>
                  )}

                  {props.messengerReducer.messages !== null &&
                    props.messengerReducer.messages.map((message) => (
                      <Message key={message.id} content={message} />
                    ))}
                </div>
                <form>
                  <div style={{ paddingTop: "10xp" }} className="form-inline">
                    <input
                      style={{ width: "345px" }}
                      type="text"
                      className="form-control"
                      value={message}
                      aria-describedby="texthelp"
                      placeholder="Enter message"
                      onKeyPress={(e) => {
                        e.key === "Enter" && sendMessage(e);
                      }}
                      onChange={(e) => handleMessageChange(e)}
                    />
                    <button
                      onClick={(e) => sendMessage(e)}
                      type="button"
                      className="btn btn-primary"
                    >
                      send
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div
        className="col-8"
        style={{
          height: "600px",
          padding: "0 10px",
        }}
      >
        <div
          id="messageTable"
          style={{
            backgroundColor: "#7FFFD4",
            height: "530px",
            overflowY: "scroll",
          }}
        >
          {props.messengerReducer.currentRoom === null && (
            <h1 style={{ paddingTop: "200px" }}>Please, select chat room</h1>
          )}

          {props.messengerReducer.messages !== null &&
            props.messengerReducer.messages.map((message) => (
              <Message key={message.id} content={message} />
            ))}
        </div>
        <form>
          <div style={{ paddingTop: "10xp" }} className="form-inline">
            <input
              style={{ width: "345px" }}
              type="text"
              className="form-control"
              value={message}
              aria-describedby="texthelp"
              placeholder="Enter message"
              onKeyPress={(e) => {
                e.key === "Enter" && sendMessage(e);
              }}
              onChange={(e) => handleMessageChange(e)}
            />
            <button
              onClick={(e) => sendMessage(e)}
              type="button"
              className="btn btn-primary"
            >
              send
            </button>
          </div>
        </form>
      </div>
    );
  }
};

const mapStateToProps = (state) => ({
  authReducer: state.authReducer,
  messengerReducer: state.messengerReducer,
});

export default connect(mapStateToProps, {
  setMessages,
  newMessage,
})(Chat);
