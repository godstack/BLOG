import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { requestLikePost } from '../../redux/actions';
import './PostCard.scss';

export const PostCard = ({ post, author, loading }) => {
  const dispatch = useDispatch();

  const { user } = useSelector(state => state.session);
  debugger;
  const likes = post.likes.find(userId => userId === user.userId) ? (
    <i class='fas fa-heart icon-red'></i>
  ) : (
    <i className='far fa-heart'></i>
  );

  const handleLike = () => {
    console.log(post._id);
    dispatch(requestLikePost(post._id));
  };

  return (
    <section className='post-card'>
      <NavLink to={`/profile/${author.username}`}>
        <div
          className='post-card__authorImg'
          style={{
            backgroundImage: author.profileImg
              ? author.profileImg
              : `url(https://www.flaticon.com/svg/static/icons/svg/929/929493.svg)`
          }}
        />
      </NavLink>

      <div className='post-card__authorUsername'>
        <NavLink to={`/profile/${author.username}`}>@{author.username}</NavLink>
      </div>
      <div
        className='post-card__img'
        style={{ backgroundImage: `url(${post.image})` }}
      />
      <div className='post-card__text'>{post.text}</div>
      <div className='post_actions'>
        <button className='action-item' onClick={handleLike} disabled={loading}>
          {likes} {post.likes.length}
        </button>
        <button className='action-item' disabled={loading}>
          <i className='fas fa-comment'></i>
        </button>
      </div>
    </section>
  );
};
