import axios from 'axios';
import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { PostUserData } from '../../redux/actions';
import './style.scss';

export const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const avatarinputRef = useRef(null);
  const { authData } = useSelector((state) => state.authReducer);

  const [userInputData, setUserInputData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [userAvatarURL, setUserAvatarURL] = useState('');

  const validateInput = (data, type) => {
    if (data) {
      if (data.nameMessage && type === 'name') {
        return true;
      } else if (data.emailMessege && type === 'email') {
        return true;
      } else if (data.passwordMessege && type === 'password') {
        return true;
      }
    }

    return false;
  };

  const submitUserData = (values) => {
    const sendValues = {
      ...values,
      avatar: userAvatarURL,
    };
    dispatch(PostUserData(sendValues));
  };
  const onChangeInput = (target) => {
    setUserInputData((prev) => ({ ...prev, [target.name]: target.value }));
  };

  const onFileChangeInput = async (event) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append('image', file);
      const { data } = await axios.post('http://localhost:3030/uploads', formData);
      console.log(data);
      setUserAvatarURL(data.url);
    } catch (err) {
      console.warn(err);
      alert('error on uploading an image');
    }
  };

  if (authData && authData.isLoggedin) {
    navigate('/');
    window.localStorage.setItem('token', authData.token);
  }
  return (
    <div className="register-wrapper">
      <div className="registerForm-wrapper">
        <span className="register-inscription">Enter your credentials</span>
        <div className="register-avatarInput" onClick={() => avatarinputRef.current.click()}>
          {userAvatarURL ? (
            <img
              src={`http://localhost:3030${userAvatarURL}`}
              alt="unable to load"
              width="100%"
              height="100%"
            />
          ) : (
            <span>upload your avatar</span>
          )}
        </div>
        <input ref={avatarinputRef} onChange={onFileChangeInput} type="file" hidden />
        <input
          className={
            validateInput(authData, 'name')
              ? 'name-registerInput name-registerInput-error'
              : 'name-registerInput'
          }
          type="text"
          name="name"
          placeholder="name"
          value={userInputData.name}
          onChange={(e) => onChangeInput(e.target)}
        />
        <input
          className={
            validateInput(authData, 'email')
              ? 'email-registerInput email-registerInput-error'
              : 'email-registerInput'
          }
          type="email"
          name="email"
          placeholder="email"
          value={userInputData.email}
          onChange={(e) => onChangeInput(e.target)}
        />
        <input
          className={
            validateInput(authData, 'password')
              ? 'password-registerInput password-registerInput-error'
              : 'password-registerInput'
          }
          type="password"
          name="password"
          placeholder="password"
          value={userInputData.password}
          onChange={(e) => onChangeInput(e.target)}
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
          Register
        </button>
      </div>
    </div>
  );
};
