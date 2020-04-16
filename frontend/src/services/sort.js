import { SORT_BY_TIME, SORT_BY_LIKES, SORT_BY_COMMENTS } from "./types";

export const sortByTime = () => (dispatch) => {
  dispatch({
    type: SORT_BY_TIME,
  });
};

export const sortByLikes = () => (dispatch) => {
  dispatch({
    type: SORT_BY_LIKES,
  });
};

export const sortByComments = () => (dispatch) => {
  dispatch({
    type: SORT_BY_COMMENTS,
  });
};
