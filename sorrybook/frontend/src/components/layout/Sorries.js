import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { getSorries } from "../../services/sorryService";

import Sorry from "../sorries/Sorry";
import NewSorry from "../sorries/NewSorry";
import Banner from "../sorries/Banner";
import Comment from "../comments/Layout";

const Sorries = props => {
  useEffect(() => {
    props.getSorries();
  }, []);

  return (
    <div>
      <NewSorry />
      <Banner />
      <Comment />

      <div style={{ margin: "auto", maxWidth: "700px" }} className="container">
        <ul className="list-group">
          {props.sorriesReducer.map(sorry => {
            return (
              <li className="list-group-item" key={sorry.id}>
                <Sorry content={sorry} />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  sorriesReducer: state.sorriesReducer.sorries
});

export default connect(mapStateToProps, { getSorries })(Sorries);
