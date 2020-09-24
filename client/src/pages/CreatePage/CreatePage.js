import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { requestCreatePost } from '../../redux/actions';

import './CreatePage.scss';

export const CreatePage = () => {
  const { register, errors, handleSubmit } = useForm();
  const dispatch = useDispatch();

  const onSubmit = data => {
    console.log('data', data);

    const fd = new FormData();
    fd.append('title', data.title);
    fd.append('text', data.text);
    fd.append('img', data.img[0], data.img[0].name);

    dispatch(requestCreatePost(fd));
  };

  return (
    <section className='create-page'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          ref={register({
            required: 'FILE IS REQUIRED'
          })}
          type='file'
          name='img'
          accept='image/jpeg,image/png'
        />
        {errors.img && <p className='input-error'>{errors.img?.message}</p>}
        <input
          ref={register({
            required: 'TITLE IS REQUIRED'
          })}
          type='text'
          name='title'
        />
        {errors.title && <p className='input-error'>{errors.title?.message}</p>}
        <textarea
          ref={register({
            required: 'TEXT IS REQUIRED'
          })}
          name='text'
        />
        {errors.text && <p className='input-error'>{errors.text?.message}</p>}
        <button type='submit'>Submit</button>
      </form>
    </section>
  );
};
