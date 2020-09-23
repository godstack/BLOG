import React from 'react';
import { useDispatch } from 'react-redux';
import { requestLogout } from '../../redux/actions';
import './ProfilePage.scss';

export const ProfilePage = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(requestLogout());
  };

  return (
    <div>
      <h1>Profile page</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};
