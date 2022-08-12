import React from 'react';
import './Auth.css';
import Logo from '../../img/logo.png';
import { useDispatch } from 'react-redux';
import { logIn, signUp } from '../../actions/AuthAction';

const Auth = () => {
  // IF SIGNUP IS FALSE THEN WE ARE RENDERING THE LOGIN PAGE
  const [isSignUp, setIsSignUp] = React.useState(true);

  // IMPORT DISPATCH FROM REACT-REDUX
  const dispatch = useDispatch();

  // DATA of the form
  const [data, setData] = React.useState({
    firstname: '',
    lastname: '',
    password: '',
    confirmpass: '',
    username: '',
  });

  // CONFIRM PASSWORD VALIDATION
  const [confirmPass, setConfirmPass] = React.useState(true);

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  // HANDLE SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      // if (data.password !== data.confirmpass) setConfirmPass(false);
      data.password !== data.confirmpass
        ? dispatch(signUp(data))
        : setConfirmPass(false);
    } else {
      dispatch(logIn(data));
    }
  };

  // reset form so it doesnt show the message when cliking on login
  const resetForm = () => {
    setConfirmPass(true);
    setData({
      firstname: '',
      lastname: '',
      password: '',
      confirmpass: '',
      username: '',
    });
  };

  return (
    <div className="Auth">
      {/* LEFT SIDE  */}
      <div className="a-left">
        <img src={Logo} alt="" />
        <div className="Webname">
          <h1>ZKC Media</h1>
          <h6>Explore the ideas throughout the world</h6>
        </div>
      </div>

      {/* <LogIn /> */}

      {/* RIGHT SIDE  */}
      <div className="a-right">
        <form className="infoForm authForm" onSubmit={handleSubmit}>
          <h3>{isSignUp ? 'Sign up' : 'Log In'}</h3>

          {isSignUp && (
            <div>
              <input
                type="text"
                placeholder="First Name"
                className="infoInput"
                name="firstname"
                onChange={handleChange}
                value={data.firstname}
              />
              <input
                type="text"
                placeholder="Last Name"
                className="infoInput"
                name="lastname"
                onChange={handleChange}
                value={data.lastname}
              />
            </div>
          )}

          <div>
            <input
              type="text"
              className="infoInput"
              name="username"
              placeholder="Usernames"
              onChange={handleChange}
              value={data.username}
            />
          </div>

          <div>
            <input
              type="password"
              className="infoInput"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              value={data.password}
            />

            {isSignUp && (
              <input
                type="password"
                className="infoInput"
                name="confirmpass"
                placeholder="Confirm Password"
                onChange={handleChange}
                value={data.confirmpass}
              />
            )}
          </div>

          <span
            style={{
              display: confirmPass ? 'none' : 'block',
              color: 'red',
              fontSize: '12px',
              alignSelf: 'flex-end',
              marginRight: '5px',
            }}
          >
            * Confirm password is not the same
          </span>

          <div>
            <span
              style={{ fontSize: '12px', cursor: 'pointer' }}
              onClick={() => {
                setIsSignUp((prev) => !prev);
                resetForm();
              }}
            >
              {isSignUp
                ? 'Already have an account?, Login!'
                : "Don't have an account?, Sign up!"}
            </span>
          </div>
          <button className="button infoButton" type="submit">
            {isSignUp ? 'Sign Up' : 'Log In'}
          </button>
        </form>
      </div>
    </div>
  );
};

// function SignUp() {
//   return (
//     <div className="a-right">
//       <form className="infoForm authForm">
//         <h3>Sign up</h3>

//         <div>
//           <input
//             type="text"
//             placeholder="First Name"
//             className="infoInput"
//             name="firstname"
//           />
//           <input
//             type="text"
//             placeholder="Last Name"
//             className="infoInput"
//             name="lastname"
//           />
//         </div>

//         <div>
//           <input
//             type="text"
//             className="infoInput"
//             name="username"
//             placeholder="Usernames"
//           />
//         </div>

//         <div>
//           <input
//             type="text"
//             className="infoInput"
//             name="password"
//             placeholder="Password"
//           />
//           <input
//             type="text"
//             className="infoInput"
//             name="confirmpass"
//             placeholder="Confirm Password"
//           />
//         </div>

//         <div>
//           <span style={{ fontSize: '12px' }}>
//             Already have an account. Login!
//           </span>
//         </div>
//         <button className="button infoButton" type="submit">
//           Signup
//         </button>
//       </form>
//     </div>
//   );
// }

export default Auth;
