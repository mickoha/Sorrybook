import React, { useEffect, Fragment } from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

import { Provider } from "react-redux";
import store from "../store";

import Header from "./layout/Header";
import Alerts from "./layout/Alerts";
import Sorries from "./layout/Sorries";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Profile from "./profile/Profile";
import Messenger from "./messenger/Messenger";

import { loadUser } from "../services/auth";
import { getUsers } from "../services/users";

const alertOptions = {
  timeout: 3000,
  position: "top center",
};

const App = (props) => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  useEffect(() => {
    store.dispatch(getUsers());
  }, []);

  return (
    <Provider store={store}>
      <AlertProvider template={AlertTemplate} {...alertOptions}>
        <Router>
          <Fragment>
            <Header />
            <Alerts />
            <Switch>
              <Route exact path="/" render={() => <Sorries />} />
              <Route
                exact
                path="/profile/:id"
                render={({ match }) => <Profile id={match.params.id} />}
              />
              <Route exact path="/login" render={() => <Login />} />
              <Route exact path="/register" render={() => <Register />} />
              <Route exact path="/messenger" render={() => <Messenger />} />
            </Switch>
          </Fragment>
        </Router>
      </AlertProvider>
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
