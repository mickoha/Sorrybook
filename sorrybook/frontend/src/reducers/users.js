import { GET_USERS, ADD_USER } from "../services/types";

const reducer = (state = [], action) => {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        users: action.content
      };
    case ADD_USER:
      return {
        ...state,
        users: state.users.concat(action.content.user)
      }

    default:
      return state;
  }
};

export default reducer;
