import { CREATE_MESSAGE } from "../services/types";

const initialState = {};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_MESSAGE:
      return (state = action.content);
    default:
      return state;
  }
};

export default reducer;
