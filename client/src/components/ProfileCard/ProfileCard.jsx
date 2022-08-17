import React from 'react';
import Cover from '../../img/cover.jpg';
import Profile from '../../img/profileImg.jpg';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './ProfileCard.css';

const ProfileCard = () => {
  const { user } = useSelector((state) => state.authReducer.authData);

  // extract image from the local server
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

  const ProfilePage = false;

  return (
    <div className="ProfileCard">
      <div className="ProfileImages">
        <img
          src={
            user.coverPicture
              ? serverPublic + user.coverPicture
              : serverPublic + 'defaultCover.jpg'
          }
          alt=""
        />
        <img
          src={
            user.profilePicture
              ? serverPublic + user.coverPicture
              : serverPublic + 'defaultProfile.png'
          }
          alt=""
        />
      </div>

      <div className="ProfileName">
        <span>
          {user.firstname} {user.lastname}
        </span>
        <span>{user.worksAt ? user.worksAt : 'Write about yourself!'}</span>
      </div>

      <div className="followStatus">
        <hr />
        <div>
          <div className="follow">
            <span>{user.following.length}</span>
            <span>Following </span>
          </div>
          <div className="vl"></div>

          <div className="follow">
            <span>{user.followers.length}</span>
            <span>Followers </span>
          </div>

          {ProfilePage && (
            <>
              <div className="vl"></div>

              <div className="follow">
                <span>3</span>
                <span>Posts</span>
              </div>
            </>
          )}
        </div>
        <hr />
      </div>
      {ProfilePage ? (
        ''
      ) : (
        <span>
          <Link
            style={{ textDecoration: 'none', color: 'inherit' }}
            to={`/profile/${user._id}`}
          >
            My Profile
          </Link>
        </span>
      )}
    </div>
  );
};

export default ProfileCard;
