import axios from "axios";

import {
  SET_CONTENT_COMMENTS,
  COMMENTS_LOADING,
  ADD_COMMENT,
  DELETE_COMMENT
} from "./types";

import { tokenConfig } from "./auth";

export const getComments = data => (dispatch, getState) => {
  dispatch({
    type: COMMENTS_LOADING
  });

  axios
    .get(`api/comments/${data.sorry.id}`, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: SET_CONTENT_COMMENTS,
        content: { ...data, comments: res.data }
      })
    )
    .catch(e => console.log(e));
};

export const addComment = data => (dispatch, getState) => {
  axios
    .post("api/create-comment/", data, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: ADD_COMMENT,
        content: res.data
      })
    )
    .catch(e => console.log(e));
};

//Returns deleted comment
export const deleteComment = id => (dispatch, getState) => {
  axios
    .delete(`api/delete-comment/${id}`, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: DELETE_COMMENT,
        content: res.data
      })
    )
    .catch(e => console.log(e));
};
