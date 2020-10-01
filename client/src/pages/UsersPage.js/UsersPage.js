import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { requestGetUsersList } from '../../redux/actions/usersActions';
import './UsersPage.scss';

export const UsersPage = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const { users, type } = useSelector(state => state.users);

  console.log(users, type);

  useEffect(() => {
    dispatch(requestGetUsersList(location.pathname));
  }, []);

  return <div>UsersPage</div>;
};
