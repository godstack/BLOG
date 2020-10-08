import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  requestLikeFromHome,
  requestPostsFromAllUsers,
  requestDeletePostFromHome
} from '../../redux/actions/homePageActions';
import { PostCard } from '../../components/PostCard/PostCard';
import { Loader } from '../../components/Loader/Loader';
import { Pagination } from '../../components/Pagination/Pagination';
import './HomePage.scss';

export const HomePage = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);

  const { loading, posts, pagesCount } = useSelector(state => state.home);
  const [hashtags, setHashtags] = useState('');

  useEffect(() => {
    dispatch(requestPostsFromAllUsers(currentPage, hashtags));
  }, [hashtags]);

  const onSubmit = data => {
    dispatch(requestPostsFromAllUsers(currentPage, data.hashtags));
  };

  function showPosts() {
    if (loading) {
      return (
        <div className='home-page__loading'>
          <Loader />
        </div>
      );
    }

    if (!posts?.length) {
      return (
        <div className='home-page__posts'>
          <div className='empty'>
            Users did't add any posts yet <i className='far fa-frown-open'></i>
          </div>
        </div>
      );
    }

    return (
      <div className='home-page__posts'>
        {posts?.map((post, i) => (
          <PostCard
            post={post}
            key={post._id}
            author={post.author}
            requestLikePost={requestLikeFromHome}
            requestDeletePost={requestDeletePostFromHome}
          />
        ))}
      </div>
    );
  }

  return (
    <section className='home-page'>
      <h2 className='home__header'>
        <div className='tab-name'>Home</div>
        <div className='item'>Posts from all users</div>
      </h2>

      <input
        type='text'
        name='hashtags'
        className='hashtags-input'
        placeholder='Find post by hashtag'
        autoComplete='off'
        onChange={e => setHashtags(e.target.value)}
      />

      {showPosts()}
      {!loading && (
        <div className='home-page__pagination'>
          <Pagination
            currentPage={currentPage}
            pagesCount={pagesCount}
            setPage={setCurrentPage}
            callback={page =>
              dispatch(requestPostsFromAllUsers(page, hashtags))
            }
          />
        </div>
      )}
    </section>
  );
};
