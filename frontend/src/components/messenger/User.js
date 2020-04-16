import React from "react";

const User = (props) => {
  const newParticipants = props.content.participants.filter(
    (user) => user.username !== props.authUser
  );

  return (
    <div>
      {newParticipants.map((user) => {
        return <h6 key={user.username}>{user.username}</h6>;
      })}
    </div>
  );
};

export default User;
