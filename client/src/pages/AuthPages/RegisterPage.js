import React from 'react';
import { useForm } from 'react-hook-form';
import { useHttp } from '../../hooks/http.hook';
import './AuthPage.scss';

export const RegisterPage = () => {
  const { loading, request } = useHttp();
  const { register, errors, handleSubmit } = useForm();

  const onSubmit = async data => {
    try {
      const response = await request('/api/auth/register', 'POST', { ...data });
      console.log(response);
    } catch (e) {}
  };

  return (
    <div className='auth-page'>
      <h2 className='auth__header'>Sign Up</h2>
      <form className='auth-form' onSubmit={handleSubmit(onSubmit)}>
        <div className='input-field'>
          <input
            ref={register({ required: 'FIELD IS REQUIRED' })}
            name='username'
            placeholder='Username'
            autoComplete='off'
            type='text'
          />
          {errors.username && (
            <p className='input-error'>{errors.username?.message}</p>
          )}
        </div>
        <div className='input-field'>
          <input
            ref={register({ required: 'FIELD IS REQUIRED' })}
            name='email'
            placeholder='Email'
            autoComplete='off'
            type='text'
          />
          {errors.email && (
            <p className='input-error'>{errors.email?.message}</p>
          )}
        </div>
        <div className='input-field'>
          <input
            ref={register({ required: 'FIELD IS REQUIRED' })}
            name='password'
            placeholder='Password'
            autoComplete='off'
            type='password'
          />
          {errors.password && (
            <p className='input-error'>{errors.password?.message}</p>
          )}
        </div>
        <div className='input-field'>
          <label className='label'>Birthday:</label>
          <input
            ref={register({ required: 'FIELD IS REQUIRED' })}
            name='birthday'
            placeholder='Birthday'
            autoComplete='off'
            type='date'
          />
          {errors.birthday && (
            <p className='input-error'>{errors.birthday?.message}</p>
          )}
        </div>
        <div className='input-field'>
          <label className='label'>Gender:</label>
          <select
            name='gender'
            ref={register({ required: 'FIELD IS REQUIRED' })}
          >
            <option value='Male'>Male</option>
            <option value='Female'>Female</option>
          </select>
          {errors.gender && (
            <p className='input-error'>{errors.gender?.message}</p>
          )}
        </div>
        <div className='input-field'>
          <textarea
            name='bio'
            ref={register({ required: 'FIELD IS REQUIRED' })}
            placeholder='Bio'
          />
          {errors.bio && <p className='input-error'>{errors.bio?.message}</p>}
        </div>

        <input
          type='submit'
          className='btn'
          value='Sign up'
          disabled={loading}
        />
      </form>
    </div>
  );
};
