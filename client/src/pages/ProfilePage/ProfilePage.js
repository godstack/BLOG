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

  const { user, posts, pagesCount, postsCount, loading } = useSelector(
    state => state.profile
  );

  const { user: authUser } = useSelector(state => state.session);

  const handleFollow = () => {
    dispatch(requestFollow(user.username));
  };

  const showFollowBtn = () => {
    debugger;
    const isSelfAccount = authUser.userId === user.id;

    if (isSelfAccount) {
      return <div className='empty'></div>;
    }

    const isExist = user.followers.find(id => id === authUser.userId);

    return (
      <button className={classNames('btn')} onClick={handleFollow}>
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
        <div className='profile__user-img' />
        <div className='profile__info'>
          {showFollowBtn()}
          <div className='profile__username'>@{user.username}</div>
        </div>
      </header>

      {posts.map(post => (
        <PostCard key={post._id} author={user} post={post} />
      ))}
    </section>
  );
};
