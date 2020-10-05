import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { FileInfo } from '../../components/FileInfo/FileInfo';
import {
  requestUpdateUserInfoFromSettings,
  requestUserInfoForSettings
} from '../../redux/actions/settingsActions';
import './SettingsProfilePage.scss';

export const SettingsProfilePage = () => {
  const { handleSubmit, register, errors } = useForm();

  const dispatch = useDispatch();

  const { user } = useSelector(state => state.settings);

  const [file, setFile] = useState(null);

  const [gender, setGender] = useState('female');

  useEffect(() => {
    setGender(user?.gender);
  }, [user?.gender]);

  useEffect(() => {
    dispatch(requestUserInfoForSettings());
  }, []);

  const onSubmit = data => {
    const fd = new FormData();

    console.log(data);
    fd.append('username', data.username);
    fd.append('bio', data.bio);
    fd.append('birthday', data.birthday);
    fd.append('gender', data.gender);

    if (data.profileImg.length) {
      fd.append('profileImg', data.profileImg[0], data.profileImg[0].name);
    }

    dispatch(requestUpdateUserInfoFromSettings(fd));
  };

  return (
    <section className='settings-profile'>
      <header className='settings-profile__header'>Edit profile</header>

      <form onSubmit={handleSubmit(onSubmit)} className='settings-form'>
        <input type='submit' value='Save' className='btn' />
        <div className='file-input-wrapper'>
          <div
            className='profileImg'
            style={{
              backgroundImage: user?.profileImg
                ? `url(${user?.profileImg})`
                : `url(https://www.flaticon.com/svg/static/icons/svg/929/929493.svg)`
            }}
          >
            <input
              type='file'
              accept='image/jpeg,image/png'
              name='profileImg'
              ref={register}
              id='profileImg'
              onChange={e => setFile(e.target.files[0])}
            />
            <label htmlFor='profileImg'>
              <i className='fas fa-folder-plus'></i>
            </label>
          </div>
          <div className='file-info'>
            <FileInfo file={file} />
          </div>
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
          <select
            name='gender'
            ref={register}
            value={gender}
            onChange={e => setGender(e.target.value)}
          >
            <option value='female'>female</option>
            <option value='male'>male</option>
          </select>
        </div>
        <div className='input-field'>
          <textarea
            name='bio'
            placeholder='bio'
            ref={register({
              maxLength: {
                value: 300,
                message: 'BIO LENGTH SHOULD BE LESS, THAN 300 CHARACTERS'
              }
            })}
            defaultValue={user?.bio}
          />
          <label htmlFor='bio'>Bio</label>
        </div>
        <div className='input-field'>
          <label>Birthday</label>
          <input
            type='date'
            name='birthday'
            ref={register}
            defaultValue={user?.birthday.split('T')[0]}
          />
        </div>
      </form>
    </section>
  );
};
