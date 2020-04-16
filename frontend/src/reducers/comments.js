import {
  SET_CONTENT_COMMENTS,
  COMMENTS_LOADING,
  ADD_COMMENT,
  DELETE_COMMENT
} from "../services/types";

const initialState = {
  sorry: {},
  username: null,
  comments: null,
  isLoading: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case COMMENTS_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case SET_CONTENT_COMMENTS:
      return {
        ...state,
        sorry: action.content.sorry,
        username: action.content.username,
        comments: action.content.comments,
        isLoading: false
      };
    case ADD_COMMENT:
      return {
        ...state,
        comments: state.comments.concat(action.content),
        sorry: {
          ...state.sorry,
          comments: state.sorry.comments + 1
        }
      };
    case DELETE_COMMENT:
      return {
        ...state,
        comments: state.comments.filter(
          comment => comment.id !== action.content.id
        ),
        sorry: {
          ...state.sorry,
          comments: state.sorry.comments - 1
        }
      };
    default:
      return state;
  }
};

export default reducer;
