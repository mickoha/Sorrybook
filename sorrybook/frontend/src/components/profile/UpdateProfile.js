import React, { useState } from "react";
import { connect } from "react-redux";
import { updateProfile } from "../../services/users";

const UpdateProfile = props => {
  const [information, setInformation] = useState({
    picture: props.profileReducer.profile.picture,
    bio: props.profileReducer.profile.bio
  });
  const handleSubmit = e => {
    e.preventDefault();
    const id = props.authReducer.id;
    const content = information;
    props.updateProfile(id, content);
  };

  const handleChange = e => {
    setInformation({
      ...information,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div
      className="modal fade"
      id="updateProfile"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="newSorryModal"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h3 className="modal-title" id="updateProfile">
              Update profile
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
              <label>Picture url</label>
              <input
                type="text"
                className="form-control"
                id="inputPicture"
                placeholder="url of the picture"
                name="picture"
                value={information.picture}
                onChange={e => handleChange(e)}
              ></input>
              <small id="pictureHelp" className="form-text text-muted">
                url must end with some of the following tags: "jpg, jpeg, png"
              </small>
            </div>
            <div className="form-group">
              <label>About me</label>
              <input
                type="text"
                className="form-control"
                id="inputBio"
                placeholder="content"
                name="bio"
                value={information.bio}
                onChange={e => handleChange(e)}
              ></input>
              <small id="bioHelp" className="form-text text-muted">
                Max 500 characters
              </small>
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
              onClick={e => handleSubmit(e)}
              type="button"
              data-dismiss="modal"
              className="btn btn-primary"
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  authReducer: state.authReducer.user,
  profileReducer: state.profileReducer
});

export default connect(mapStateToProps, { updateProfile })(UpdateProfile);
