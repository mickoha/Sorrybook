import React from "react";

const Sorry = props => {
  var apologist = "himself";
  if (props.content.apologist !== "") {
    apologist = props.content.apologist;
  }

  const date = props.content.created_at.split("T");
  const time = date[1].split(".");

  return (
    <div className="card">
      <div className="card-body">
        <h3>
          Admin as <i>{apologist}</i>
        </h3>
        <h4>Sorry</h4>
        <p style={{ fontSize: "1.5em" }} className="card-text">
          {props.content.content}
        </p>
        <div className="container">
          <div
            style={{ paddingTop: "5px", borderTop: "1px solid black" }}
            className="row justify-content-md-start"
          >
            <div className="col-2">
              <button className="btn btn-block btn-primary">like</button>
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

export default Sorry;
