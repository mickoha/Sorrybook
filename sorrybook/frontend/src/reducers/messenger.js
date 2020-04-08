import { SET_CHATROOMS, SET_MESSAGES, NEW_MESSAGE } from "../services/types";

const initialState = {
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
    case SET_MESSAGES:
      return {
        ...state,
        messages: action.content,
      };
    case NEW_MESSAGE:
      console.log(action.content);
      return {
        ...state,
        messages: state.messages.concat(action.content),
      };
    default:
      return state;
  }
};

export default reducer;
