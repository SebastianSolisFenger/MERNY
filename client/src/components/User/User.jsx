import React, { useState } from 'react';
import { useReducer } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { unfollowUser } from '../../actions/userAction';

const User = ({ person }) => {
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);

  // CHECK IF THE AUTH USER IS FOLLOWING THE PERSON
  const [following, setFollowing] = useState(
    person.followers.includes(user._id)
  );

  // HANLDE FOLLOW
  const handleFollow = () => {
    dispatch(unfollowUser(person._id, user));
  };

  return (
    <div className="follower">
      <div>
        <img
          src={
            person.profilePicture
              ? serverPublic + person.profilePicture
              : serverPublic + 'defaultProfile.png'
          }
          alt={person.name}
          className="followerImg"
        />
        <div className="name">
          <span>{person.firstname}</span>
          <span>{person.username}</span>
        </div>
      </div>
      <button className="button fc-button" onClick={handleFollow}>
        {following ? 'Unfollow' : 'Follow'}
      </button>
    </div>
  );
};

export default User;
