import {
  GET_SORRIES,
  ADD_SORRY,
  DELETE_SORRY,
  LIKE_SORRY
} from "../services/types";

const initialState = {
  sorries: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SORRIES:
      return {
        ...state,
        sorries: action.content
      };
    case ADD_SORRY:
      return {
        ...state,
        sorries: state.sorries.concat(action.content)
      };
    case DELETE_SORRY:
      return {
        ...state,
        sorries: state.sorries.filter(sorry => sorry.id !== action.content)
      };
    case LIKE_SORRY:
      return {
        ...state,
        sorries: state.sorries.map(sorry =>
          sorry.id !== action.content.id ? sorry : action.content
        )
      };
    default:
      return state;
  }
};

export default reducer;
