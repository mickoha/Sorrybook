import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

import { Provider } from "react-redux";
import store from "../store";

import Header from "./layout/Header";
import Sorries from "./sorries/Sorries";
import Login from "./auth/Login";
import Register from "./auth/Register";

const App = props => {
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Header />
          <Switch>
            <Route exact path="/" render={() => <Sorries />} />
            <Route exact path="/login" render={() => <Login />} />
            <Route exact path="/register" render={() => <Register />} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
