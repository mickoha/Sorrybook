import { setMessages } from "../services/messenger";
import { connect } from "react-redux";

class WebSocketService {
  static instance = null;
  callbacks = {};

  static getInstance() {
    if (!WebSocketService.instance) {
      WebSocketService.instance = new WebSocketService();
    }
    return WebSocketService.instance;
  }

  constructor() {
    this.socketRef = null;
  }

  connect(chatId) {
    const path = `ws://${window.location.host}/ws/chat/${chatId}/`;
    this.socketRef = new WebSocket(path);
    this.socketRef.onopen = () => {
      console.log("WebSocket open");
    };
    this.socketRef.onmessage = (e) => {
      this.socketNewMessage(e.data);
    };
    this.socketRef.onerror = (e) => {
      console.log(e.message);
    };
  }

  disconnect() {
    this.socketRef.close();
  }

  socketNewMessage = (data) => {
    const parsedData = JSON.parse(data);
    const command = parsedData.command;

    if (Object.keys(this.callbacks).length === 0) {
      return;
    }
    if (command === "messages") {
      this.callbacks[command](parsedData.messages);
    }
    if (command === "new_message") {
      this.callbacks[command](parsedData.message);
    }
  };

  fetchMessages(username, chatId) {
    this.sendMessage({
      command: "fetch_messages",
      username: username,
      chatId: chatId,
    });
  }

  newChatMessage(message) {
    this.sendMessage({
      command: "new_message",
      from: message.from,
      content: message.content,
      chatId: message.chatId,
    });
  }

  addCallbacks(messagesCallback, newMessageCallback) {
    this.callbacks["messages"] = messagesCallback;
    this.callbacks["new_message"] = newMessageCallback;
  }

  sendMessage(data) {
    try {
      this.socketRef.send(JSON.stringify(data));
    } catch (err) {
      console.log(err.message);
    }
  }

  state() {
    return this.socketRef.readyState;
  }
}

const WebSocketInstance = WebSocketService.getInstance();

export default WebSocketInstance;
