import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { requestUserInfoForSettings } from '../../redux/actions/settingsActions';
import './SettingsProfilePage.scss';

export const SettingsProfilePage = () => {
  const { handleSubmit, register, errors } = useForm();

  const dispatch = useDispatch();

  const { user } = useSelector(state => state.settings);

  useEffect(() => {
    dispatch(requestUserInfoForSettings());
  }, []);

  const onSubmit = data => {};

  return (
    <section className='settings-profile'>
      <header className='settings-profile__header'>
        <h2>Edit profile</h2>
      </header>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div
          className='profileImg'
          style={{
            backgroundImage: user?.profileImg
              ? user?.profileImg
              : `url(https://www.flaticon.com/svg/static/icons/svg/929/929493.svg)`
          }}
        >
          <input
            type='file'
            accept='image/jpeg,image/png'
            name='profileImg'
            ref={register}
          />
        </div>
        <div className='input-field'>
          <label>Username</label>
          <input
            ref={register({
              required: 'FIELD IS REQUIRED',
              minLength: {
                value: 4,
                message: 'USERNAME LENGTH SHOULD BE GREATER, THAN 3 CHARACTERS'
              },
              maxLength: {
                value: 12,
                message: 'USERNAME LENGTH SHOULD BE LESS, THAN 13 CHARACTERS'
              }
            })}
            name='username'
            placeholder='Username'
            autoComplete='off'
            type='text'
            defaultValue={user?.username}
          />
          {errors.username && (
            <p className='input-error'>{errors.username?.message}</p>
          )}
        </div>
        <div className='input-field'>
          <label>Gender</label>
          <select name='gender' ref={register} defaultValue={user?.gender}>
            <option value='female'>female</option>
            <option value='male'>male</option>
          </select>
        </div>
        <div className='input-field'>
          <label>Bio</label>
          <textarea
            name='bio'
            placeholder='bio'
            ref={register}
            defaultValue={user?.bio}
          />
        </div>
        <div className='input-field'>
          <label>Birthday</label>
          <input type='date' name='birthday' ref={register} />
        </div>
      </form>
    </section>
  );
};
