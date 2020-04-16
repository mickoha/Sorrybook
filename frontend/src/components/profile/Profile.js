import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getProfile } from "../../services/users";

import UpdateProfile from "./UpdateProfile";

const Profile = props => {
  const profile = props.profileReducer;

  useEffect(() => {
    props.getProfile(props.id);
  }, []);

  var profilePicture =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/450px-No_image_available.svg.png";
  var bio = "no content";

  if (!profile.profile || !props.usersReducer || props.authReducer.isLoading) {
    return <h2>Loading</h2>;
  } else {
    const users = props.usersReducer;
    const user = users.filter(user => user.id === profile.profile.id);

    if (profile.profile.picture !== "") {
      profilePicture = profile.profile.picture;
    }

    if (profile.profile.bio !== "") {
      bio = profile.profile.bio;
    }

    const updateButton = () => {
      if (
        props.authReducer.user !== null &&
        user[0].id === props.authReducer.user.id
      ) {
        return (
          <div>
            <h2>{user[0].username}</h2>
            <button
              style={{ marginBottom: "10px" }}
              className="btn btn-outline-dark"
              type="button"
              className="btn btn-primary"
              data-toggle="modal"
              data-target="#updateProfile"
            >
              update
            </button>
          </div>
        );
      } else {
        return (
          <div>
            <h2>{user[0].username}</h2>
          </div>
        );
      }
    };

    return (
      <div>
        <UpdateProfile />
        <div
          style={{
            marginTop: "20px",
            border: "1px solid black",
            maxWidth: "300px",
            heigth: "600px",
            textAlign: "center"
          }}
          className="container"
        >
          {updateButton()}
          <img
            src={profilePicture}
            alt="profile"
            width="200"
            height="200"
          ></img>
          <h4>About me</h4>
          <div style={{ border: "1px solid black", marginBottom: "10px" }}>
            <p>{bio}</p>
          </div>
        </div>
      </div>
    );
  }
};

const mapStateToProps = state => ({
  authReducer: state.authReducer,
  profileReducer: state.profileReducer,
  usersReducer: state.usersReducer.users
});

export default connect(mapStateToProps, { getProfile })(Profile);
