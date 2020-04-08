import { SET_MESSAGES, NEW_MESSAGE, SET_CHATROOMS } from "./types";

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

export const getChatRooms = () => (dispatch, getState) => {
  axios
    .get("api/chat", tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: SET_CHATROOMS,
        content: res.data,
      })
    )
    .catch((e) => console.log(e.response.data));
};
