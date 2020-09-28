import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { requestGetProfileInfo } from '../../redux/actions';
import { PostCard } from '../../components/PostCard/PostCard';

import './ProfilePage.scss';

export const ProfilePage = () => {
  const { username } = useParams();
  const dispatch = useDispatch();

  const { user, posts, pagesCount, postsCount } = useSelector(
    state => state.profile
  );

  useEffect(() => {
    dispatch(requestGetProfileInfo(username, 1));
  }, []);

  if (!user) {
    return <div>No such user</div>;
  }

  return (
    <section className='profile-page'>
      <h1>Profile page</h1>
      {posts.map(post => (
        <PostCard key={post._id} author={user} post={post} />
      ))}
    </section>
  );
};
