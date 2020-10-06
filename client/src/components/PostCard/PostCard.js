import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { Dropdown } from '../Dropdown/Dropdown';
import './PostCard.scss';

export const PostCard = ({
  post,
  author,
  requestLikePost,
  requestDeletePost
}) => {
  const dispatch = useDispatch();

  const menuNode = useRef();

  const { user } = useSelector(state => state.session);

  const [open, setOpen] = useState(false);

  const isSelfPost = user.username === author.username;

  const isLiked = post.likes.find(userId => userId === user.userId);
  const likes = isLiked ? (
    <i className='fas fa-heart'></i>
  ) : (
    <i className='far fa-heart'></i>
  );

  function handleClickOutside(event) {
    if (
      !event.target.classList.contains('dropdown', 'fas fa-chevron-down') &&
      !menuNode.current.contains(event.target)
    ) {
      debugger;
      setOpen(false);
    }
  }

  function handleDropdown(e) {
    if (e.target.classList.contains('dropdown')) {
      return;
    }
    setOpen(!open);
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

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
              ? `url(${author.profileImg})`
              : `url(https://www.flaticon.com/svg/static/icons/svg/929/929493.svg)`
          }}
        />
      </NavLink>

      {isSelfPost && (
        <div
          className='dropdown-opener'
          onClick={handleDropdown}
          ref={menuNode}
        >
          <i className='fas fa-chevron-down open-icon'></i>
          {open && (
            <Dropdown postId={post._id} requestDeletePost={requestDeletePost} />
          )}
        </div>
      )}

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
