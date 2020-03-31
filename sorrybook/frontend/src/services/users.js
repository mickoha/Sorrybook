import axios from "axios";

import { GET_USERS, GET_PROFILE } from "../services/types";

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
