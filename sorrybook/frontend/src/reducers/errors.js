import { GET_ERRORS } from "../services/types";

const initialState = {
  msg: {},
  status: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ERRORS:
      return {
        msg: action.content.msg,
        status: action.content.status
      };
    default:
      return state;
  }
};

export default reducer;
