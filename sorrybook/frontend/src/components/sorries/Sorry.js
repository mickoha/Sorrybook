import React from "react";
import { connect } from "react-redux";
import { deleteSorry } from "../../services/sorryService";

const Sorry = props => {
  var apologist = "himself";
  if (props.content.apologist !== "") {
    apologist = props.content.apologist;
  }

  const date = props.content.created_at.split("T");
  const time = date[1].split(".");

  const handleDelete = e => {
    e.preventDefault();
    props.deleteSorry(props.content.id);
  };
  return (
    <div className="card">
      <div className="card-body">
        <div className="container">
          <div className="row justify-content-md-start">
            <div className="col-10">
              <h3>
                <a href={`profile/${props.content.owner}`}>
                  {props.content.owner}
                </a>{" "}
                as <i>{apologist}</i>
              </h3>
            </div>
            <div className="col-2">
              <button
                onClick={e => handleDelete(e)}
                type="button"
                className="btn btn-outline-danger"
              >
                delete
              </button>
            </div>
          </div>

          <h4>Sorry</h4>
          <p style={{ fontSize: "1.5em" }} className="card-text">
            for {props.content.content}
          </p>
          <div
            style={{ paddingTop: "5px", borderTop: "1px solid black" }}
            className="row justify-content-md-start"
          >
            <div className="col-2">
              <button type="button" className="btn btn-primary">
                like
              </button>
            </div>
            <div className="col-6">
              <button type="button" className="btn btn-outline-primary">
                comment
              </button>
            </div>
            <div className="col-4">
              {date[0]} {time[0]}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(null, { deleteSorry })(Sorry);
