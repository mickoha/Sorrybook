import {
  GET_SORRIES,
  ADD_SORRY,
  DELETE_SORRY,
  LIKE_SORRY,
  ADD_COMMENT,
  DELETE_COMMENT
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
    case ADD_COMMENT:
      const sorry = state.sorries.filter(
        sorry => sorry.id === action.content.sorry
      );
      const updatedSorry = { ...sorry[0], comments: sorry[0].comments + 1 };
      console.log(updatedSorry);
      return {
        ...state,
        sorries: state.sorries.map(sorry =>
          sorry.id !== updatedSorry.id ? sorry : updatedSorry
        )
      };
    case DELETE_COMMENT:
      const sorry2 = state.sorries.filter(
        sorry => sorry.id === action.content.sorry
      );
      const updatedSorry2 = { ...sorry2[0], comments: sorry2[0].comments - 1 };
      console.log(updatedSorry2);
      return {
        ...state,
        sorries: state.sorries.map(sorry =>
          sorry.id !== updatedSorry2.id ? sorry : updatedSorry2
        )
      };
    default:
      return state;
  }
};

export default reducer;
