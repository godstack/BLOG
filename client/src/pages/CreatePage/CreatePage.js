import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import {
  requestCreatePost,
  requestEditPost,
  requestGetPost
} from '../../redux/actions/postActions';
import { Loader } from '../../components/Loader/Loader';
import { FileInfo } from '../../components/FileInfo/FileInfo';
import { useLocation, useParams } from 'react-router-dom';
import CreatableSelect from 'react-select/creatable';
import './CreatePage.scss';

export const CreatePage = () => {
  const { register, errors, handleSubmit, setValue } = useForm();
  const dispatch = useDispatch();

  const { postId } = useParams();

  const location = useLocation();

  const actionType = location.pathname.split('/')[2];

  const { loading, post } = useSelector(state => state.post);

  function defaultValueHashtags() {
    if (!post?.hashtags) {
      return [];
    }

    const arr = [];

    const hashtagsArr = post?.hashtags.split(',');

    for (const item of hashtagsArr) {
      arr.push({ label: item, value: item });
    }

    return arr;
  }

  useEffect(() => {
    setHashtags(defaultValueHashtags());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post]);

  const [file, setFile] = useState(null);
  const [hashtags, setHashtags] = useState([]);

  useEffect(() => {
    if (actionType === 'edit') {
      dispatch(requestGetPost(postId));
    } else {
      setValue('text', '', { shouldValidate: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const onSubmit = data => {
    const fd = new FormData();

    let hashtagsArr = [];

    for (const item of hashtags) {
      hashtagsArr.push(item.value.replace(/\W/g, '').toLowerCase());
    }

    fd.append('hashtags', hashtagsArr);
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

      <h2 className=' page-header'>{actionType} post</h2>

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
          defaultValue={post?.postText}
          placeholder='Write description to your picture here'
        />
        {errors.text && <p className='input-error'>{errors.text?.message}</p>}

        <div className='hashtags__select'>
          <CreatableSelect
            onChange={value => setHashtags(value)}
            isMulti
            placeholder='Write hashtags here'
            value={hashtags}
          />
        </div>

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
