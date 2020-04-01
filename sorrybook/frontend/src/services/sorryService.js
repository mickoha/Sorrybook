import axios from "axios";

import {
  GET_SORRIES,
  ADD_SORRY,
  DELETE_SORRY,
  GET_ERRORS,
  LIKE_SORRY
} from "./types";

import { createMessage, returnErrors } from "./messages";
import { tokenConfig } from "./auth";

export const getSorries = () => dispatch => {
  axios
    .get("api/sorries/")
    .then(res => {
      dispatch({
        type: GET_SORRIES,
        content: res.data
      });
    })
    .catch(e => {
      const error = {
        msg: e.response.data,
        status: e.response.status
      };
      dispatch({
        type: GET_ERRORS,
        content: error
      });
    });
};

export const addSorry = content => (dispatch, getState) => {
  axios
    .post("api/sorries/", content, tokenConfig(getState))
    .then(res => {
      dispatch(createMessage({ sorryAdded: "Sorry added succesfully" }));
      dispatch({
        type: ADD_SORRY,
        content: res.data
      });
    })
    .catch(e => {
      dispatch(returnErrors(e.response.data, e.response.status));
    });
};

export const deleteSorry = id => (dispatch, getState) => {
  axios
    .delete(`api/sorries/${id}`, tokenConfig(getState))
    .then(res => {
      dispatch(createMessage({ sorryDeleted: "Sorry deleted succesfully" }));
      dispatch({
        type: DELETE_SORRY,
        content: id
      });
    })
    .catch(e => {
      dispatch(returnErrors(e.response.data, e.response.status));
    });
};

export const likeSorry = id => (dispatch, getState) => {
  const data = {
    id: id
  };
  axios
    .post("api/like/", data, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: LIKE_SORRY,
        content: res.data
      })
    )
    .catch(e => {
      dispatch(returnErrors(e.response.data, e.response.status));
    });
};
