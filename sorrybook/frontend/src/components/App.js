import React, { Fragment } from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";
import store from "../store";

import Header from "./layout/Header";
import Sorries from "./sorries/Sorries";

const App = props => {
  return (
    <Provider store={store}>
      <Fragment>
        <Header />
        <Sorries />
      </Fragment>
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
