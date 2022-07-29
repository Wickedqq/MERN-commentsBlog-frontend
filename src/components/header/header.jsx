import React from 'react';
import 'remixicon/fonts/remixicon.css';
import { Link, useNavigate } from 'react-router-dom';

import './style.scss';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';

export const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { authData } = useSelector((state) => state.authReducer);

  return (
    <div className="header-wrapper">
      <div className="header-logo">
        <Link className="router-link" to="/">
          <i className="ri-home-4-line ri-xl"></i>
        </Link>
        <Link className="router-link" to="/">
          Home
        </Link>
      </div>
      <div className="header-auth">
        {authData && authData.isLoggedin ? (
          <div className="header-auth-wrapper">
            <div className="header-mePage">
              <Link className="router-link" to="/me">
                Me
              </Link>
            </div>
            <div
              className="header-logout-btn"
              onClick={() => {
                if (window.confirm('Are you sure that you want to logout?')) {
                  dispatch(logout());
                  window.localStorage.removeItem('token');
                  navigate('/');
                }
              }}>
              Log out
              <i className="ri-logout-box-line ri-lg"></i>
            </div>
          </div>
        ) : (
          <div className="header-auth-wrapper">
            <div className="header-register">
              <Link className="router-link" to="/register">
                Register
              </Link>
            </div>
            <div className="header-login-btn">
              <Link className="router-link" to="/login">
                Log in
              </Link>
              <Link className="router-link" to="/login">
                <i className="ri-login-box-line ri-lg"></i>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
