import { GET_PROFILE } from "../services/types";

const reducer = (state = {}, action) => {
  switch (action.type) {
    case GET_PROFILE:
      return {
        profile: action.content
      };

    default:
      return state;
  }
};

export default reducer;
