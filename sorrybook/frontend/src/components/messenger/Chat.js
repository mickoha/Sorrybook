import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { setMessages, newMessage } from "../../services/messenger";

import Message from "./Message";

import WebSocketInstance from "../websocket";

const Chat = (props) => {
  const [loaded, setLoaded] = useState(false);
  const [message, setMessage] = useState("");
  const [roomLoaded, setRoomLoaded] = useState(false);
  const [lastRoom, setLastRoom] = useState(null);

  if (props.chatRoom === null) {
    return <h1>Please, select chat room</h1>;
  }

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

  if (props.chatRoom !== lastRoom && roomLoaded) {
    console.log("moi");
    WebSocketInstance.disconnect();
    setRoomLoaded(false);
  }

  if (props.chatRoom !== null && !roomLoaded) {
    waitForSocketConnection(() => {
      setLoaded(true);
    });

    WebSocketInstance.connect(props.chatRoom);
    setRoomLoaded(true);
    setLastRoom(props.chatRoom);
  }

  if (loaded) {
    WebSocketInstance.fetchMessages(
      props.authReducer.user.username,
      props.chatRoom
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
      chatId: props.chatRoom,
    };

    WebSocketInstance.newChatMessage(messageObject);
    setMessage("");
  };

  const scrollBot = () => {
    const table = document.getElementById("messageTable");
    table.scrollTop = table.scrollHeight;
  };

  if (props.messageReducer !== null) {
    setTimeout(scrollBot, 1000);
  }

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
          backgroundColor: "#f1f1f1",
          height: "530px",
          overflowY: "scroll",
        }}
      >
        {props.messengerReducer === null && <h3>Loading...</h3>}
        {props.messengerReducer !== null &&
          props.messengerReducer.map((message) => (
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
};

const mapStateToProps = (state) => ({
  authReducer: state.authReducer,
  messengerReducer: state.messengerReducer.messages,
});

export default connect(mapStateToProps, {
  setMessages,
  newMessage,
})(Chat);
