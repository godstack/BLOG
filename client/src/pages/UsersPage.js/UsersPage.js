import React, { useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { requestGetUsersList } from '../../redux/actions/usersActions';
import { UserItem } from '../../components/UserItem/UserItem';
import { Loader } from '../../components/Loader/Loader';
import './UsersPage.scss';

export const UsersPage = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const [, userListOwner, type] = location.pathname.split('/');

  const { users, loading } = useSelector(state => state.users);

  console.log(users);

  function showUsersList() {
    if (loading) {
      return (
        <div className='users-page__loading'>
          <Loader />
        </div>
      );
    }

    if (!users?.length) {
      return (
        <div className='users-list__empty'>
          <span>User list is empty</span> <i className='far fa-frown-open'></i>
        </div>
      );
    }

    return (
      <div className='users-list'>
        {users?.map(user => (
          <UserItem user={user} key={user.id} />
        ))}
      </div>
    );
  }

  useEffect(() => {
    dispatch(requestGetUsersList(location.pathname));
  }, []);

  return (
    <section className='users-page'>
      <header className='users-page__header'>
        <div className='header__links'>
          <NavLink to={`/profile/${userListOwner}`} className='link-back'>
            <i className='fas fa-arrow-left'></i>
          </NavLink>
          <div className='list-owner'>@{userListOwner}</div>
        </div>
        <div className='list-type'>{type}</div>
      </header>
      {showUsersList()}
    </section>
  );
};
