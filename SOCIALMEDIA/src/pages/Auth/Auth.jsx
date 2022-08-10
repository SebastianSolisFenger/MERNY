import React from 'react';
import './Auth.css';
import Logo from './../../img/logo.png';

const Auth = () => {
  return (
    <div className="Auth">
      <div className="a-left">
        <img src={Logo} alt="" />
        <div className="Webname">
          <h1>ZCK Media</h1>
          <h6>Explore the ideas throughout the world</h6>
        </div>
      </div>

      <h1>Form</h1>
    </div>
  );
};

export default Auth;
