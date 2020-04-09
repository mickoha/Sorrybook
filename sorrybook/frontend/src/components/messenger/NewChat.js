import React, { useState } from "react";
import { connect } from "react-redux";

import { startChatRoom } from "../../services/messenger";

const NewChat = (props) => {
  const [userListRight, setUserListRight] = useState([]);

  if (props.usersReducer.users === null || props.authReducer === null) {
    return <h2>Loading...</h2>;
  }

  const handleClickLeft = (user) => {
    setUserListRight(userListRight.concat(user));
  };

  const handleClickRight = (user2) => {
    setUserListRight(
      userListRight.filter((user) => user.username !== user2.username)
    );
  };

  const handleRoomStart = (e) => {
    e.preventDefault();
    var data = { participants: [props.authReducer.id] };

    userListRight.map((user) => {
      data = {
        ...data,
        participants: data.participants.concat(user.id),
      };
    });

    props.startChatRoom(data);
    setUserListRight([]);
  };

  return (
    <div>
      <div
        className="modal fade"
        id="newChatModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="newChatModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="ewChatModalLabel">
                Select users for a chat room
              </h5>
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
              <div className="row justify-content-md-start">
                <ul style={{ marginLeft: "30px" }}>
                  <h6>Select from here</h6>
                  {props.usersReducer.users.map((user) => {
                    if (user.username !== props.authReducer.username) {
                      return (
                        <li
                          type="button"
                          onClick={() => handleClickLeft(user)}
                          key={user.id}
                        >
                          {user.username}
                        </li>
                      );
                    }
                  })}
                </ul>
                <ul style={{ marginLeft: "60px" }}>
                  <h6>Selected users</h6>
                  {userListRight.map((user) => (
                    <li
                      type="button"
                      onClick={() => handleClickRight(user)}
                      key={user.id}
                    >
                      {user.username}
                    </li>
                  ))}
                </ul>
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
                onClick={(e) => handleRoomStart(e)}
                type="button"
                data-dismiss="modal"
                className="btn btn-primary"
              >
                Start chat room
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  authReducer: state.authReducer.user,
  usersReducer: state.usersReducer,
});

export default connect(mapStateToProps, { startChatRoom })(NewChat);
