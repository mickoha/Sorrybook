import { combineReducers } from "redux";
import sorries from "./sorries";
import errors from "./errors";
import messages from "./messages";
import auth from "./auth";
import users from "./users";
import profile from "./profile";
import comments from "./comments";
import messenger from "./messenger";

export default combineReducers({
  sorriesReducer: sorries,
  errorsReducer: errors,
  messagesReducer: messages,
  authReducer: auth,
  usersReducer: users,
  profileReducer: profile,
  commentsReducer: comments,
  messengerReducer: messenger,
});
