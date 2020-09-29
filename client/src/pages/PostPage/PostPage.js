import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { requestGetPost } from '../../redux/actions';
import './PostPage.scss';

export const PostPage = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { post, author } = useSelector(state => state.post.postPage);

  useEffect(() => {
    dispatch(requestGetPost(params.postId));
  }, [dispatch, params.postId]);

  if (!post) {
    return <div>Post not Found</div>;
  }

  return (
    <section className='post-page'>
      <div
        className='post-page__img'
        style={{ backgroundImage: `url(${post.image})` }}
      ></div>
    </section>
  );
};
