import React, { useEffect, useState } from 'react';
import './InfoCard.css';
import { UilPen } from '@iconscout/react-unicons';
import { useSelector } from 'react-redux';
import ProfileModal from '../ProfileModal/ProfileModal';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as UserApi from '../../api/UserRequest.js';
import { logOut } from '../../actions/AuthAction';

const InfoCard = () => {
  const [modalOpened, setModalOpened] = useState(false);

  const dispatch = useDispatch();
  // HOOK
  const params = useParams();

  const profileUserId = params.id;

  const [profileUser, setProfileUser] = useState({});

  const { user } = useSelector((state) => state.authReducer.authData);

  // whenever someone calls the profile page of the user we want the INFO CARD to RENDER correctly
  useEffect(() => {
    const fetchProfileUser = async () => {
      // if the profile is my profile, then I want to get my profile
      if (profileUserId === user._id) {
        setProfileUser(user);
      } else {
        // if the profile is someone else's profile, then I want to get that profile (fetch it from the API)
        const profileUser = await UserApi.getUser(profileUserId);
        setProfileUser(profileUser);
      }
    };
    fetchProfileUser();
    // to prevernt the useEffect from running everytime the component is rendered only with the dependency => [user]
    // this means that every time the user is changed the useEffect will run
  }, [user]);

  // HANDLE LOG OUT
  const handleLogOut = () => {
    dispatch(logOut());
  };

  return (
    <div className="InfoCard">
      <div className="infoHead">
        <h4> Profile Info</h4>
        {profileUserId === user._id ? (
          <div>
            <UilPen
              width="2rem"
              height="1.2rem"
              onClick={() => setModalOpened(true)}
            />
            <ProfileModal
              modalOpened={modalOpened}
              setModalOpened={setModalOpened}
            />
          </div>
        ) : (
          ' '
        )}
      </div>

      <div className="info">
        <span>
          <b>Status</b>
        </span>
        <span>{profileUser.relationship}</span>
      </div>

      <div className="info">
        <span>
          <b>Lives in</b>
        </span>
        <span>{profileUser.livesin}</span>
      </div>

      <div className="info">
        <span>
          <b>Works at</b>
        </span>
        <span>{profileUser.worksAt}</span>
      </div>

      <button className="button logout-button" onClick={handleLogOut}>
        Logout
      </button>
    </div>
  );
};

export default InfoCard;
