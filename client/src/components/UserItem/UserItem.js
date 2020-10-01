import React from 'react';
import { FollowButton } from '../FollowButton/FollowButton';
import './UserItem.scss';

export const UserItem = ({ user }) => {
  return (
    <section className='user-item'>
      <div style={{ backgroundImage: `url(${user.profileImage})` }} />
      <div>{user.username}</div>
      <FollowButton />
    </section>
  );
};
