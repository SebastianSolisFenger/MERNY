import React from 'react';

const User = ({ person }) => {
  return (
    <div className="follower">
      <div>
        <img src={person.img} alt={person.name} className="followerImg" />
        <div className="name">
          <span>{person.name}</span>
          <span>{person.username}</span>
        </div>
      </div>
      <button className="button fc-button">Follow</button>
    </div>
  );
};

export default User;
