import axios from "axios";

import { GET_SORRIES, ADD_SORRY } from "./types";

export const getSorries = () => dispatch => {
  axios
    .get("api/sorries/")
    .then(res => {
      dispatch({
        type: GET_SORRIES,
        content: res.data
      });
    })
    .catch(e => console.log(e));
};

export const addSorry = content => dispatch => {
  axios
    .post("api/sorries/", content)
    .then(res => {
      dispatch({
        type: ADD_SORRY,
        content: res.data
      });
    })
    .catch(e => console.log(e));
};
