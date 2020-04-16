import React, { useState, Component } from "react";
import { connect } from "react-redux";

import { addSorry } from "../../services/sorryService";

const NewSorry = (props) => {
  const [apologistContent, setApologistContent] = useState({
    apologist: "",
    content: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    props.addSorry(apologistContent);
    setApologistContent({ apologist: "", content: "" });
  };

  const handleChange = (e) => {
    setApologistContent({
      ...apologistContent,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div
      className="modal fade"
      id="newSorryModal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="newSorryModal"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h3 className="modal-title" id="newSorryLabel">
              New Sorry
            </h3>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="form-group">
              <label>Apologist</label>
              <input
                type="text"
                className="form-control"
                id="inputApologist"
                placeholder="Enter Apologist"
                name="apologist"
                value={apologistContent.apologist}
                onChange={(e) => handleChange(e)}
              ></input>
              <small id="apologistHelp" className="form-text text-muted">
                Optional
              </small>
            </div>
            <div className="form-group">
              <label>Sorry for ...</label>
              <input
                type="text"
                className="form-control"
                id="inputContent"
                placeholder="continue sentence"
                name="content"
                value={apologistContent.content}
                onChange={(e) => handleChange(e)}
              ></input>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
            <button
              onClick={(e) => handleSubmit(e)}
              type="button"
              data-dismiss="modal"
              className="btn btn-primary"
            >
              Add sorry
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    sorrieReducer: state.sorrieReducer.sorries,
  };
};
export default connect(null, { addSorry })(NewSorry);
