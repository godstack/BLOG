import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { requestFollow, requestGetProfileInfo } from '../../redux/actions';
import { PostCard } from '../../components/PostCard/PostCard';
import { Loader } from '../../components/Loader/Loader';
import classNames from 'classnames';
import './ProfilePage.scss';

export const ProfilePage = () => {
  const { username } = useParams();
  const dispatch = useDispatch();

  const {
    user,
    posts,
    pagesCount,
    postsCount,
    loading,
    followLoading,
    postUpdateLoading
  } = useSelector(state => state.profile);

  const { user: authUser } = useSelector(state => state.session);

  const handleFollow = () => {
    dispatch(requestFollow(user.username));
  };

  const showFollowBtn = () => {
    const isSelfAccount = authUser.userId === user.id;

    if (isSelfAccount) {
      return <div className='empty'></div>;
    }

    const isExist = user.followers.find(id => id === authUser.userId);

    return (
      <button
        className={classNames('btn', { 'unfollow-btn': isExist })}
        onClick={handleFollow}
        disabled={followLoading}
      >
        {isExist ? 'Unfollow' : 'Follow'}
      </button>
    );
  };

  useEffect(() => {
    dispatch(requestGetProfileInfo(username, 1));
  }, []);

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
          {showFollowBtn()}
          <div className='profile__username'>@{user.username}</div>
          <div className='profile__details'>
            <div className='profile__followers'>
              <span className='details-span'>{user.followers.length}</span>{' '}
              Followers
            </div>
            <div className='profile__following'>
              <span className='details-span'>{user.following.length}</span>{' '}
              Following
            </div>
            <div className='profile__following'>
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
    </section>
  );
};
