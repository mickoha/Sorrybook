import {
  SET_MESSAGES,
  NEW_MESSAGE,
  SET_CHATROOMS,
  CURRENT_ROOM,
  ADD_CHATROOM,
} from "./types";

import { tokenConfig } from "./auth";
import axios from "axios";

export const setMessages = (data) => (dispatch) => {
  dispatch({
    type: SET_MESSAGES,
    content: data.reverse(),
  });
};

export const newMessage = (data) => (dispatch) => {
  dispatch({
    type: NEW_MESSAGE,
    content: data,
  });
};

export const currentRoom = (data) => (dispatch) => {
  dispatch({
    type: CURRENT_ROOM,
    content: data,
  });
};

export const getChatRooms = () => (dispatch, getState) => {
  axios
    .get("api/chat/", tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: SET_CHATROOMS,
        content: res.data,
      })
    )
    .catch((e) => console.log(e.response.data));
};

export const startChatRoom = (data) => (dispatch, getState) => {
  axios
    .post("api/create-chat/", data, tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: ADD_CHATROOM,
        content: res.data,
      })
    )
    .catch((e) => console.log(e));
};
