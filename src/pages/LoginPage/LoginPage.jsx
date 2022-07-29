import React from 'react';
import { useState } from 'react';
import './style.scss';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserData } from '../../redux/actions';

export const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { authData } = useSelector((state) => state.authReducer);

  const [userInputData, setUserInputData] = useState({
    email: '',
    password: '',
  });

  const validateInput = (data, type) => {
    if (data) {
      if (data.emailMessege && type === 'email') {
        return true;
      } else if (data.passwordMessege && type === 'password') {
        return true;
      }
    }

    return false;
  };

  const submitUserData = (values) => {
    dispatch(fetchUserData(values));
  };
  const onChangeInput = (target) => {
    setUserInputData((prev) => ({ ...prev, [target.name]: target.value }));
  };

  if (authData && authData.isLoggedin) {
    navigate('/');
    window.localStorage.setItem('token', authData.token);
  }
  return (
    <div className="loginPage-wrapper">
      <div className="loginForm-wrapper">
        <span className="login-inscription">Enter your credentials</span>
        <input
          className={
            validateInput(authData, 'email')
              ? 'email-loginInput-error email-loginInput'
              : 'email-loginInput'
          }
          name="email"
          type="email"
          placeholder="email"
          value={userInputData.email}
          onChange={(e) => onChangeInput(e.target)}
        />
        <input
          className={
            validateInput(authData, 'password')
              ? 'password-loginInput-error password-loginInput'
              : 'password-loginInput'
          }
          name="password"
          type="password"
          placeholder="password"
          value={userInputData.password}
          onChange={(e) => {
            onChangeInput(e.target);
          }}
        />

        {authData && (
          <span className="auth-error-message">
            {authData.message || authData.emailMessege}
            <br />
            <br />
            {authData.passwordMessege}
          </span>
        )}

        <button onClick={() => submitUserData(userInputData)} className="LoginBtn">
          Log in
        </button>
      </div>
    </div>
  );
};
