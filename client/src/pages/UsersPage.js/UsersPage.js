import React from 'react';
import { useLocation } from 'react-router-dom';
import './UsersPage.scss';

export const UsersPage = () => {
  const location = useLocation();

  console.log(location.pathname.includes('followers'));

  return <div>UsersPage</div>;
};
