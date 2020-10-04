import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { requestCreatePost } from '../../redux/actions/postActions';
import { Loader } from '../../components/Loader/Loader';
import { FileInfo } from '../../components/FileInfo/FileInfo';
import './CreatePage.scss';

export const CreatePage = () => {
  const { register, errors, handleSubmit } = useForm();
  const dispatch = useDispatch();

  const loading = useSelector(state => state.post.loading);

  const [file, setFile] = useState(null);

  const onSubmit = data => {
    const fd = new FormData();

    fd.append('text', data.text);
    fd.append('img', data.img[0], data.img[0].name);

    dispatch(requestCreatePost(fd));
  };

  return (
    <section className='create-page'>
      {loading && (
        <div className='workspace-loader'>
          <Loader />
        </div>
      )}

      <h2 className='create-page__header'>Add a new POST</h2>

      <form onSubmit={handleSubmit(onSubmit)} className='post-form'>
        <button type='submit' className='post-form-btn' disabled={loading}>
          Submit
        </button>

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
          <input
            ref={register({
              required: 'FILE IS REQUIRED'
            })}
            type='file'
            name='img'
            id='img'
            accept='image/jpeg,image/png'
            onChange={e => setFile(e.target.files[0])}
          />

          <label htmlFor='img' className='file-upload'>
            <i className='fa fa-arrow-up'></i>
          </label>
        </div>
        {errors.img && <p className='input-error'>{errors.img?.message}</p>}
      </form>

      <div className='file-info'>
        <FileInfo file={file} />
      </div>
    </section>
  );
};
