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
      <header className='settings-profile__header'>Edit profile</header>

      <form onSubmit={handleSubmit(onSubmit)} className='settings-form'>
        <input type='submit' value='Save' className='btn' />

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
            id='profileImg'
          />
          <label htmlFor='profileImg'>
            <i className='fas fa-folder-plus'></i>
          </label>
        </div>

        <div className='input-field'>
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
            id='username'
            placeholder='Username'
            autoComplete='off'
            type='text'
            defaultValue={user?.username}
          />
          <label htmlFor='username'>Username</label>
          {errors.username && (
            <p className='input-error'>{errors.username?.message}</p>
          )}
        </div>
        <div className='select'>
          <div className='select__title'>Gender</div>
          <select name='gender' ref={register} defaultValue={user?.gender}>
            <option value='female'>female</option>
            <option value='male'>male</option>
          </select>
        </div>
        <div className='input-field'>
          <textarea
            name='bio'
            placeholder='bio'
            ref={register}
            defaultValue={user?.bio}
          />
          <label htmlFor='bio'>Bio</label>
        </div>
        <div className='input-field'>
          <label>Birthday</label>
          <input type='date' name='birthday' ref={register} />
        </div>
      </form>
    </section>
  );
};
