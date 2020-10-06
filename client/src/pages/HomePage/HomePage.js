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

  useEffect(() => {
    dispatch(requestPostsFromAllUsers(currentPage));
  }, []);

  function showPosts() {
    if (loading) {
      return (
        <div className='home-page__loading'>
          <Loader />
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
      {showPosts()}
      {!loading && (
        <div className='home-page__pagination'>
          <Pagination
            currentPage={currentPage}
            pagesCount={pagesCount}
            setPage={setCurrentPage}
            callback={page => dispatch(requestPostsFromAllUsers(page))}
          />
        </div>
      )}
    </section>
  );
};
