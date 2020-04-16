import {
  GET_SORRIES,
  ADD_SORRY,
  DELETE_SORRY,
  LIKE_SORRY,
  ADD_COMMENT,
  DELETE_COMMENT,
  SORT_BY_TIME,
  SORT_BY_LIKES,
  SORT_BY_COMMENTS,
} from "../services/types";

const initialState = {
  sorries: [],
  sort: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SORRIES:
      return {
        ...state,
        sorries: action.content,
      };
    case ADD_SORRY:
      return {
        ...state,
        sorries: [action.content].concat(state.sorries),
      };
    case DELETE_SORRY:
      return {
        ...state,
        sorries: state.sorries.filter((sorry) => sorry.id !== action.content),
      };
    case LIKE_SORRY:
      return {
        ...state,
        sorries: state.sorries.map((sorry) =>
          sorry.id !== action.content.id ? sorry : action.content
        ),
      };
    case ADD_COMMENT:
      const sorry = state.sorries.filter(
        (sorry) => sorry.id === action.content.sorry
      );
      const updatedSorry = { ...sorry[0], comments: sorry[0].comments + 1 };
      return {
        ...state,
        sorries: state.sorries.map((sorry) =>
          sorry.id !== updatedSorry.id ? sorry : updatedSorry
        ),
      };
    case DELETE_COMMENT:
      const sorry2 = state.sorries.filter(
        (sorry) => sorry.id === action.content.sorry
      );
      const updatedSorry2 = { ...sorry2[0], comments: sorry2[0].comments - 1 };
      console.log(updatedSorry2);
      return {
        ...state,
        sorries: state.sorries.map((sorry) =>
          sorry.id !== updatedSorry2.id ? sorry : updatedSorry2
        ),
      };
    case SORT_BY_TIME:
      const sortedArrayTime = state.sorries.sort((a, b) => {
        return new Date(b.created_at) - new Date(a.created_at);
      });
      return {
        ...state,
        sorries: sortedArrayTime,
        sort: SORT_BY_TIME,
      };

    case SORT_BY_LIKES:
      const sortedArrayLikes = state.sorries.sort((a, b) => {
        return b.likes.length - a.likes.length;
      });
      return {
        ...state,
        sorries: sortedArrayLikes,
        sort: SORT_BY_LIKES,
      };

    case SORT_BY_COMMENTS:
      const sortedArrayComments = state.sorries.sort((a, b) => {
        return b.comments - a.comments;
      });
      return {
        ...state,
        sorries: sortedArrayComments,
        sort: SORT_BY_COMMENTS,
      };
    default:
      return state;
  }
};

export default reducer;
