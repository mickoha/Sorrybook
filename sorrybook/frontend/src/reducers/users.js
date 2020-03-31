import { GET_USERS } from "../services/types";

const reducer = (state = [], action) => {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        users: action.content
      };

    default:
      return state;
  }
};

export default reducer;
