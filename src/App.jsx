import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import { HomePage, Header, LoginPage, RegisterPage, MePage } from './exporter';
import { getIsAuth } from './redux/actions';

import './SCSS/index.scss';

function App() {
  const dispatch = useDispatch();
  const token = window.localStorage.getItem('token');
  useEffect(() => {
    if (token) {
      dispatch(getIsAuth(token));
    }
  }, []);

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/me" element={<MePage />} />
      </Routes>
    </div>
  );
}

export default App;
