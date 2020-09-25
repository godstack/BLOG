import React from 'react';
import { useDispatch } from 'react-redux';
import { requestLogout } from '../../redux/actions';
import { NavLink } from 'react-router-dom';
import './Header.scss';

export const Header = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(requestLogout());
  };

  return (
    <header className='header'>
      <nav className='nav'>
        <div className='logo'>
          <i className='fab fa-blogger-b'></i>
        </div>
        <div className='header__item'>
          <NavLink to='/home'>
            <i className='fas fa-home'></i>
            <span className='item__name'>Home</span>
          </NavLink>
        </div>
        <div className='header__item'>
          <NavLink to='/profile'>
            <i className='fas fa-user-circle'></i>
            <span className='item__name'>Profile</span>
          </NavLink>
        </div>
        <div className='header__item'>
          <NavLink to='/users'>
            <i className='fas fa-users'></i>
            <span className='item__name'>Users</span>
          </NavLink>
        </div>
        <div className='header__item'>
          <NavLink to='/create-post'>
            <i className='far fa-plus-square'></i>
            <span className='item__name'>Create Post</span>
          </NavLink>
        </div>

        <div className='header__item logout' onClick={handleLogout}>
          <i className='fas fa-door-open'></i>
          <span className='item__name'>Logout</span>
        </div>
      </nav>
    </header>
  );
};
