import React, { useEffect, useState } from 'react';
import './InfoCard.css';
import { UilPen } from '@iconscout/react-unicons';
import { useSelector } from 'react-redux';
import ProfileModal from '../ProfileModal/ProfileModal';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

const InfoCard = () => {
  const [modalOpened, setModalOpened] = useState(false);

  const dispatch = useDispatch();
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

  return (
    <div className="InfoCard">
      <div className="infoHead">
        <h4> Your Info</h4>
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
      </div>

      <div className="info">
        <span>
          <b>Status</b>
        </span>
        <span>in Relationship</span>
      </div>

      <div className="info">
        <span>
          <b>Lives in</b>
        </span>
        <span>Multan</span>
      </div>

      <div className="info">
        <span>
          <b>Works at</b>
        </span>
        <span>Bachaans int</span>
      </div>

      <button className="button logout-button">Logout</button>
    </div>
  );
};

export default InfoCard;
