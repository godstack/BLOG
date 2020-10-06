import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import {
  requestCreatePost,
  requestEditPost,
  requestGetPostText
} from '../../redux/actions/postActions';
import { Loader } from '../../components/Loader/Loader';
import { FileInfo } from '../../components/FileInfo/FileInfo';
import { useLocation, useParams } from 'react-router-dom';
import './CreatePage.scss';

export const CreatePage = () => {
  const { register, errors, handleSubmit } = useForm();
  const dispatch = useDispatch();

  const { postId } = useParams();

  const location = useLocation();

  const actionType = location.pathname.split('/')[2];

  const { loading, postText } = useSelector(state => state.post);

  const [file, setFile] = useState(null);

  useEffect(() => {
    if (actionType === 'edit') {
      dispatch(requestGetPostText(postId));
    }
  }, []);

  const onSubmit = data => {
    const fd = new FormData();

    fd.append('text', data.text);
    if (data.img.length) {
      fd.append('img', data.img[0], data.img[0].name);
    }

    if (actionType === 'create') {
      dispatch(requestCreatePost(fd));
    } else if (actionType === 'edit') {
      dispatch(requestEditPost(fd, postId));
    }
  };

  return (
    <section className='create-page'>
      {loading && (
        <div className='workspace-loader'>
          <Loader />
        </div>
      )}

      <h2 className='create-page__header'>{actionType} POST</h2>

      <form onSubmit={handleSubmit(onSubmit)} className='post-form'>
        <label htmlFor='img' className='image__text'>
          Upload a picture
        </label>
        <div className='wrapper'>
          <input
            ref={register({
              required: {
                value: actionType === 'create',
                message: 'FILE IS REQUIRED'
              }
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

        <textarea
          className='post-form__textarea'
          ref={register({
            maxLength: {
              value: 300,
              message: 'MAX TEXT LENGTH IS 300 CHARACTERS'
            }
          })}
          name='text'
          defaultValue={postText}
          placeholder='Write description to your picture here'
        />
        {errors.text && <p className='input-error'>{errors.text?.message}</p>}

        <button type='submit' className='post-form-btn' disabled={loading}>
          {actionType}
        </button>
      </form>

      <div className='file-info'>
        <FileInfo file={file} />
      </div>
    </section>
  );
};
