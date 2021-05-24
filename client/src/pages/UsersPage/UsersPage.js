import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { requestGetUsersList } from '../../redux/actions/usersActions';
import { UserItem } from '../../components/UserItem/UserItem';
import { Loader } from '../../components/Loader/Loader';
import { Pagination } from '../../components/Pagination/Pagination';
import './UsersPage.scss';

export const UsersPage = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const [, userListOwner, type] = location.pathname.split('/');

  const { users, loading, pagesCount } = useSelector(state => state.users);

  const [currentPage, setCurrentPage] = useState(1);

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
          <span>
            <span className='bold'>@{userListOwner}</span> has no{' '}
            <span className='bold'>{type}</span> yet
          </span>{' '}
          <i className='far fa-frown-open'></i>
        </div>
      );
    }

    return (
      <div className='users-list'>
        {users?.map(user => (
          <UserItem user={user} key={user._id} />
        ))}
      </div>
    );
  }

  function showHeaderContent() {
    if (location.pathname === '/all-users') {
      return <div className='page-header'>All users</div>;
    }

    return (
      <>
        <div className='header__links'>
          <NavLink to={`/profile/${userListOwner}`} className='link-back'>
            <i className='fas fa-arrow-left'></i>
          </NavLink>
          <div className='list-owner'>@{userListOwner}</div>
        </div>
        <div className='list-type-wrapper'>
          {' '}
          <NavLink to={`/${userListOwner}/followers`} className='list-type'>
            Followers
          </NavLink>
          <NavLink to={`/${userListOwner}/following`} className='list-type'>
            Following
          </NavLink>
        </div>
      </>
    );
  }

  useEffect(() => {
    dispatch(requestGetUsersList(location.pathname, currentPage));
    window.scrollTo({ top: 0 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userListOwner, type]);

  return (
    <section className='users-page'>
      <header className='users-page__header'>{showHeaderContent()}</header>
      {showUsersList()}

      <section className='users__pagination'>
        {!loading && (
          <Pagination
            currentPage={currentPage}
            setPage={setCurrentPage}
            pagesCount={pagesCount}
            changePage={page =>
              dispatch(requestGetUsersList(location.pathname, page))
            }
          />
        )}
      </section>
    </section>
  );
};
