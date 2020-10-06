import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { requestLogout } from '../../redux/actions/authActions';
import { NavLink } from 'react-router-dom';
import './Header.scss';

export const Header = () => {
  const dispatch = useDispatch();
  const { username } = useSelector(state => state.session.user);

  const handleLogout = () => {
    dispatch(requestLogout());
  };

  return (
    <header className='header'>
      <nav className='nav'>
        <div className='logo'>
          <i className='fab fa-blogger-b'></i>
        </div>

        <NavLink to='/home' className='header__item'>
          <i className='fas fa-home'></i>
          <span className='item__name'>Home</span>
        </NavLink>

        <NavLink to={`/profile/${username}`} className='header__item'>
          <i className='fas fa-user-circle'></i>
          <span className='item__name'>Profile</span>
        </NavLink>

        <NavLink to='/all-users' className='header__item'>
          <i className='fas fa-users'></i>
          <span className='item__name'>Users</span>
        </NavLink>

        <NavLink to='/post/create' className='header__item'>
          <i className='far fa-plus-square'></i>
          <span className='item__name'>Create Post</span>
        </NavLink>

        <div className='header__item logout' onClick={handleLogout}>
          <i className='fas fa-door-open'></i>
          <span className='item__name'>Logout</span>
        </div>
      </nav>
    </header>
  );
};
