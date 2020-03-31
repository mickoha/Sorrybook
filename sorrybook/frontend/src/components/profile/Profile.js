import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getProfile } from "../../services/users";

const Profile = props => {
  const profile = props.profileReducer;
  console.log(profile);

  useEffect(() => {
    props.getProfile(props.id);
  }, []);

  if (!profile) {
    return <h2>Loading</h2>;
  } else {
  }

  return (
    <div
      style={{
        border: "1px solid black",
        maxWidth: "600px",
        maxHeight: "600px"
      }}
      className="container"
    >
      <img src="..." alt="..." className="img-thumbnail"></img>
    </div>
  );
};

const mapStateToProps = state => ({
  authReducer: state.authReducer,
  profileReducer: state.profileReducer
});

export default connect(mapStateToProps, { getProfile })(Profile);
