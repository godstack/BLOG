import React from 'react';
import { useHistory } from 'react-router-dom';
import { requestFollowFromUsersList } from '../../redux/actions/usersActions';
import { FollowButton } from '../FollowButton/FollowButton';
import './UserItem.scss';

export const UserItem = ({ user }) => {
  const history = useHistory();

  return (
    <section
      className='user-item'
      onClick={() => history.push(`/profile/${user.username}`)}
    >
      <div
        className='user-item__img'
        style={{
          backgroundImage: user?.profileImg
            ? `url(${user?.profileImg})`
            : `url(https://www.flaticon.com/svg/static/icons/svg/929/929493.svg)`
        }}
      />
      <div className='user-item__username'>@{user.username}</div>
      <div className='user-item__btn' onClick={e => e.stopPropagation()}>
        <FollowButton user={user} requestFollow={requestFollowFromUsersList} />
      </div>
    </section>
  );
};
