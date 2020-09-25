import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { requestCreatePost } from '../../redux/actions';
import { useHistory } from 'react-router-dom';

import './CreatePage.scss';

export const CreatePage = () => {
  const { register, errors, handleSubmit } = useForm();
  const dispatch = useDispatch();

  const [file, setFile] = useState(null);

  function fileSize(size) {
    const i = Math.floor(Math.log(size) / Math.log(1024));
    return (
      (size / Math.pow(1024, i)).toFixed(2) * 1 +
      ' ' +
      ['B', 'kB', 'MB', 'GB', 'TB'][i]
    );
  }

  const onSubmit = data => {
    console.log('data', data);

    const fd = new FormData();

    fd.append('text', data.text);
    fd.append('img', data.img[0], data.img[0].name);

    dispatch(requestCreatePost(fd));
  };

  const history = useHistory();

  return (
    <section className='create-page'>
      <h2 className='create-page__header'>Add a new POST</h2>

      <form onSubmit={handleSubmit(onSubmit)} className='post-form'>
        <button type='submit' className='post-form-btn'>
          Submit
        </button>

        <button onClick={() => history.push('/profile')}>history</button>

        <textarea
          className='post-form__textarea'
          ref={register({
            maxLength: {
              value: 300,
              message: 'MAX TEXT LENGTH IS 300 CHARACTERS'
            }
          })}
          name='text'
          placeholder='Write description to your picture here'
        />
        {errors.text && <p className='input-error'>{errors.text?.message}</p>}

        <p className='image__text'>Upload a picture</p>
        <div className='wrapper'>
          <div className='file-upload'>
            <input
              ref={register({
                required: 'FILE IS REQUIRED'
              })}
              type='file'
              name='img'
              accept='image/jpeg,image/png'
              onChange={e => setFile(e.target.files[0])}
            />
            <i className='fa fa-arrow-up'></i>
          </div>
        </div>
        {errors.img && <p className='input-error'>{errors.img?.message}</p>}
      </form>

      {file && (
        <div className='list-group'>
          <div className='list-group-item'>
            <span>File name:</span> {file.name}
          </div>
          <div className='list-group-item'>
            <span>File type:</span> {file.type}
          </div>
          <div className='list-group-item'>
            <span>File size:</span> {fileSize(file.size)}
          </div>
        </div>
      )}
    </section>
  );
};
