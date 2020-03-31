import axios from "axios";

import { GET_USERS, GET_PROFILE, UPDATE_PROFILE } from "../services/types";
import { returnErrors } from "./messages";

import { tokenConfig } from "./auth";

export const getUsers = () => dispatch => {
  axios
    .get("api/users/")
    .then(res => {
      dispatch({
        type: GET_USERS,
        content: res.data
      });
    })
    .catch(e => console.log(e.response.data));
};

export const getProfile = id => dispatch => {
  axios
    .get(`/api/profiles/${id}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        content: res.data
      })
    )
    .catch(e => console.log(e.response.data));
};

export const updateProfile = (id, content) => (dispatch, getState) => {
  axios
    .patch(`api/profiles/${id}/`, content, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: UPDATE_PROFILE,
        content: res.data
      })
    )
    .catch(e => {
      dispatch(returnErrors(e.response.data, e.response.status));
    });
};
