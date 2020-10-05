import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import {
  requestFollowFromProfile,
  requestGetProfileInfo,
  requestGetUserPosts,
  requestLikeFromProfile
} from '../../redux/actions/profileActions';
import { PostCard } from '../../components/PostCard/PostCard';
import { Loader } from '../../components/Loader/Loader';
import { Pagination } from '../../components/Pagination/Pagination';
import { FollowButton } from '../../components/FollowButton/FollowButton';
import { toastr } from 'react-redux-toastr';

import './ProfilePage.scss';

export const ProfilePage = () => {
  const { username } = useParams();
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);

  const { user: authUser } = useSelector(state => state.session);

  const { user, posts, postsLoading, pagesCount, loading } = useSelector(
    state => state.profile
  );

  const isSelfAccount = authUser.username === username;

  useEffect(() => {
    dispatch(requestGetProfileInfo(username, currentPage));
  }, [username, dispatch]);

  const postsList = postsLoading ? (
    <div className='profile__posts-loader'>
      <Loader />
    </div>
  ) : (
    posts?.map(post => (
      <PostCard
        key={post._id}
        author={user}
        post={post}
        requestLikePost={requestLikeFromProfile}
      />
    ))
  );

  if (loading) {
    return (
      <div className='workspace-loader'>
        <Loader />
      </div>
    );
  }

  if (!user) {
    return <div>No such user</div>;
  }

  return (
    <section className='profile-page'>
      <header className='profile-header'>
        <div className='profile__header-photo' />
        <div
          className='profile__user-img'
          style={{
            backgroundImage: user?.profileImg
              ? `url(${user?.profileImg})`
              : `url(https://www.flaticon.com/svg/static/icons/svg/929/929493.svg)`
          }}
        />
        <div className='profile__info'>
          {isSelfAccount ? (
            <div className='link-wrapper'>
              {' '}
              <NavLink to='/settings/profile' className='btn'>
                Edit profile
              </NavLink>
            </div>
          ) : (
            <FollowButton
              user={user}
              requestFollow={requestFollowFromProfile}
            />
          )}

          <div className='profile__username'>@{user.username}</div>
          <div className='profile__details'>
            <NavLink
              to={`/${user.username}/followers`}
              className='details-item'
            >
              <span className='details-span'>{user.followers.length}</span>{' '}
              Followers
            </NavLink>
            <NavLink
              to={`/${user.username}/following`}
              className='details-item'
            >
              <span className='details-span'>{user.following.length}</span>{' '}
              Following
            </NavLink>
            <div>
              <span className='details-span'>{user.posts}</span> posts
            </div>
          </div>
        </div>
      </header>
      <section className='profile__main'>
        {postsList}

        <section className='profile__pagination'>
          {!postsLoading && (
            <Pagination
              currentPage={currentPage}
              pagesCount={pagesCount}
              setPage={setCurrentPage}
              callback={page => dispatch(requestGetUserPosts(username, page))}
            />
          )}
        </section>
      </section>
    </section>
  );
};
