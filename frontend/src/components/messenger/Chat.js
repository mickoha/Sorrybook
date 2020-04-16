import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { setMessages, newMessage } from "../../services/messenger";
import { useWindowSize } from "../layout/size";

import ChatTable from "./ChatTable";

const Chat = (props) => {
  // If window width < 500, App opens ChatTable as modal
  var size = useWindowSize();
  if (size[0] < 500) {
    return (
      <div
        className="col-8"
        style={{
          height: "600px",
          padding: "0 10px",
        }}
      >
        <div
          className="modal fade"
          id="chatTableModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="chatTableModal"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h3 className="modal-title" id="chatTableModalyes">
                  Chat room
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
                <ChatTable />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div
        className="col-8"
        style={{
          height: "600px",
          padding: "0 10px",
        }}
      >
        <ChatTable />
      </div>
    );
  }
};

const mapStateToProps = (state) => ({
  authReducer: state.authReducer,
  messengerReducer: state.messengerReducer,
});

export default connect(mapStateToProps, {
  setMessages,
  newMessage,
})(Chat);
