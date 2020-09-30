import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { requestGetProfileInfo } from '../../redux/actions/profileActions';
import { PostCard } from '../../components/PostCard/PostCard';
import { Loader } from '../../components/Loader/Loader';
import { Pagination } from '../../components/Pagination/Pagination';
import { FollowButton } from '../../components/FollowButton/FollowButton';
import './ProfilePage.scss';

export const ProfilePage = () => {
  const { username } = useParams();
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);

  const {
    user,
    posts,
    pagesCount,
    postsCount,
    loading,
    postUpdateLoading
  } = useSelector(state => state.profile);

  useEffect(() => {
    dispatch(requestGetProfileInfo(username, currentPage));
  }, [currentPage, username, dispatch]);

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
              ? user?.profileImg
              : `url(https://www.flaticon.com/svg/static/icons/svg/929/929493.svg)`
          }}
        />
        <div className='profile__info'>
          <FollowButton />
          <div className='profile__username'>@{user.username}</div>
          <div className='profile__details'>
            <div className='details-item'>
              <span className='details-span'>{user.followers.length}</span>{' '}
              Followers
            </div>
            <div className='details-item'>
              <span className='details-span'>{user.following.length}</span>{' '}
              Following
            </div>
            <div>
              <span className='details-span'>{postsCount}</span> posts
            </div>
          </div>
        </div>
      </header>

      {posts.map(post => (
        <PostCard
          key={post._id}
          author={user}
          post={post}
          loading={postUpdateLoading}
        />
      ))}

      <section className='profile__pagination'>
        <Pagination
          currentPage={currentPage}
          pagesCount={pagesCount}
          setPage={setCurrentPage}
        />
      </section>
    </section>
  );
};
