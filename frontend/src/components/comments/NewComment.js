import React, { useState } from "react";
import { connect } from "react-redux";

import { addComment } from "../../services/comments";

const newComment = props => {
  const [data, setData] = useState({
    sorry: "",
    content: ""
  });

  const handleChange = e => {
    setData({ ...data, sorry: props.id, content: e.target.value });
  };

  const handleAdd = e => {
    e.preventDefault();
    props.addComment(data);
    setData({ ...data, content: "" });
  };

  return (
    <div>
      <div style={{ paddingBottom: "10px" }} className="container">
        <div className="form-group">
          <label>Comment</label>
          <input
            type="text"
            className="form-control"
            id="comment"
            value={data.content}
            aria-describedby="comment"
            placeholder="Enter comment"
            onChange={e => handleChange(e)}
          />
        </div>
        <div className="form-group">
          <button
            className="btn btn-secondary"
            type="button"
            data-dismiss="modal"
            aria-label="Close"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={e => handleAdd(e)}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default connect(null, { addComment })(newComment);
