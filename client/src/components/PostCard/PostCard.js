import React from 'react';
import './PostCard.scss';

export const PostCard = ({ post, author }) => {
  return (
    <section className='post-card'>
      <div
        className='post-card__authorImg'
        style={{ backgroundImage: `url(${author.profileImg})` }}
      />

      <div className='post-card__authorUsername'>{author.username}</div>
      <div
        className='post-card__img'
        style={{ backgroundImage: `url(${post.image})` }}
      />
      <div className='post-card__text'>{post.text}</div>
    </section>
  );
};
