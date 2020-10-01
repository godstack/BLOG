import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { requestLikePost } from '../../redux/actions/postActions';
import classNames from 'classnames';
import './PostCard.scss';

export const PostCard = ({ post, author }) => {
  const dispatch = useDispatch();

  const { user } = useSelector(state => state.session);

  const isLiked = post.likes.find(userId => userId === user.userId);
  const likes = isLiked ? (
    <i className='fas fa-heart'></i>
  ) : (
    <i className='far fa-heart'></i>
  );

  const handleLike = () => {
    dispatch(requestLikePost(post._id, user.userId));
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
        <button
          className={classNames('action-item', { 'icon-red': isLiked })}
          onClick={handleLike}
        >
          {likes} {post.likes.length}
        </button>
        <button className='action-item'>
          <i className='fas fa-comment'></i>
        </button>
      </div>
    </section>
  );
};
