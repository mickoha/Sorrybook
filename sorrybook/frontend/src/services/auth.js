import axios from "axios";

import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAILED
} from "./types";
import { returnErrors } from "./messages";

// TOKEN CHECK AND USER LOAD
export const loadUser = () => (dispatch, getState) => {
  // Info to user loading
  dispatch({
    type: USER_LOADING
  });

  axios
    .get("api/auth/user", tokenConfig(getState))
    .then(res => {
      dispatch({
        type: USER_LOADED,
        content: res.data
      });
    })
    .catch(e => {
      dispatch(returnErrors(e.response.data, e.response.status));
      dispatch({ type: AUTH_ERROR });
    });
};

// LOGIN USER
export const loginUser = (username, password) => dispatch => {
  // Set config
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  // Set body
  const body = JSON.stringify({ username, password });

  axios
    .post("api/auth/login", body, config)
    .then(res => {
      dispatch({
        type: LOGIN_SUCCESS,
        content: res.data
      });
    })
    .catch(e => {
      dispatch(returnErrors(e.response.data, e.response.status));
      dispatch({ type: LOGIN_FAILED });
    });
};

// REGISTER USER
export const registerUser = ({ username, password, email }) => dispatch => {
  // Set config
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  // Set body
  const body = JSON.stringify({ username, password, email });

  axios
    .post("api/auth/register", body, config)
    .then(res => {
      dispatch({
        type: REGISTER_SUCCESS,
        content: res.data
      });
    })
    .catch(e => {
      dispatch(returnErrors(e.response.data, e.response.status));
      dispatch({ type: REGISTER_FAILED });
    });
};

// LOGOUT USER
export const logoutUser = () => (dispatch, getState) => {
  axios
    .post("api/auth/logout", null, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: LOGOUT_SUCCESS,
        content: res.data
      });
    })
    .catch(e => {
      dispatch(returnErrors(e.response.data, e.response.status));
    });
};

export const tokenConfig = getState => {
  // Gets token
  const token = getState().authReducer.token;

  // Set config
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  // Add token to config
  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }

  return config;
};
