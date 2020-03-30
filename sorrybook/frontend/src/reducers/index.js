import { combineReducers } from "redux";
import sorries from "./sorries";
import errors from "./errors";
import messages from "./messages";
import auth from "./auth";

export default combineReducers({
  sorriesReducer: sorries,
  errorsReducer: errors,
  messagesReducer: messages,
  authReducer: auth
});
