import React, { useEffect } from "react";
import { connect } from "react-redux";

import { getSorries } from "../../services/sorryService";

import Sorry from "./Sorry";
import NewSorry from "./NewSorry";

const Sorries = props => {
  useEffect(() => {
    props.getSorries();
  }, []);

  return (
    <div>
      <NewSorry />

      <ul style={{ margin: "auto", maxWidth: "700px" }} className="list-group">
        <div className="container">
          <div className="row justify-content-md-start">
            <div className="col-2">
              <h2>Sorries</h2>
            </div>
            <div style={{ paddingTop: "5px" }} className="col-8">
              <button
                type="button"
                className="btn btn-primary"
                data-toggle="modal"
                data-target="#newSorryModal"
              >
                New post
              </button>
            </div>
            <div style={{ paddingTop: "5px" }} className="dropdown">
              <button
                className="btn btn-outline-info dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Sort by
              </button>
              <div
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton"
              >
                <a className="dropdown-item" href="#">
                  Time
                </a>
                <a className="dropdown-item" href="#">
                  Likes
                </a>
                <a className="dropdown-item" href="#">
                  Followed
                </a>
              </div>
            </div>
          </div>
        </div>

        {props.sorriesReducer.map(sorry => {
          return (
            <li className="list-group-item" key={sorry.id}>
              <Sorry content={sorry} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const mapStateToProps = state => ({
  sorriesReducer: state.sorriesReducer.sorries,
  authReducer: state.authReducer
});

export default connect(mapStateToProps, { getSorries })(Sorries);
