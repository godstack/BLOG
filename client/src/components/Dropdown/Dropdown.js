import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

import './Dropdown.scss';

export const Dropdown = ({ postId, requestDeletePost }) => {
  const dispatch = useDispatch();

  return (
    <div className='dropdown'>
      <NavLink to='/' className='menu-item'>
        Edit{' '}
        <span className='edit'>
          <i className='fas fa-edit'></i>
        </span>
      </NavLink>
      <div
        className='menu-item'
        onClick={() => dispatch(requestDeletePost(postId))}
      >
        Delete{' '}
        <span className='delete'>
          <i className='fas fa-trash-alt'></i>
        </span>
      </div>
    </div>
  );
};
