import {
  SET_CHATROOMS,
  SET_MESSAGES,
  NEW_MESSAGE,
  CURRENT_ROOM,
  ADD_CHATROOM,
} from "../services/types";

const initialState = {
  currentRoom: null,
  chatrooms: null,
  messages: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CHATROOMS:
      return {
        ...state,
        chatrooms: action.content,
      };
    case CURRENT_ROOM:
      return {
        ...state,
        currentRoom: action.content,
      };
    case ADD_CHATROOM:
      return {
        ...state,
        chatrooms: state.chatrooms.concat(action.content),
        currentRoom: action.content.id,
      };
    case SET_MESSAGES:
      return {
        ...state,
        messages: action.content,
      };
    case NEW_MESSAGE:
      if (state.currentRoom === action.content.chatId) {
        return {
          ...state,
          messages: state.messages.concat(action.content),
        };
      } else {
        return {
          ...state,
        };
      }
    default:
      return state;
  }
};

export default reducer;
