import React from 'react';
import { useForm } from 'react-hook-form';
import { useHttp } from '../../hooks/http.hook';
import { NavLink } from 'react-router-dom';
import './AuthPage.scss';
import { useDispatch } from 'react-redux';
import { requestRegister } from '../../redux/actions';

export const RegisterPage = () => {
  const { loading, request } = useHttp();
  const { register, errors, handleSubmit } = useForm();
  const dispatch = useDispatch();

  const onSubmit = async formData => {
    try {
      dispatch(requestRegister({ ...formData }));
    } catch (e) {}
  };

  return (
    <div className='auth-page'>
      <h2 className='auth__header'>Sign Up</h2>
      <form className='auth-form' onSubmit={handleSubmit(onSubmit)}>
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
            ref={register({
              required: 'FIELD IS REQUIRED',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'INVALID EMAIL ADDRESS'
              }
            })}
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
            ref={register({
              required: 'FIELD IS REQUIRED',
              minLength: {
                value: 6,
                message: 'PASSWORD SHOULD BE LONGER, THAN 5 CHARACTERS'
              }
            })}
            name='password'
            placeholder='Password'
            autoComplete='off'
            type='password'
          />
          {errors.password && (
            <p className='input-error'>{errors.password?.message}</p>
          )}
        </div>

        <input
          type='submit'
          className='btn'
          value='Register'
          disabled={loading}
        />
      </form>

      <NavLink to='/login' className='auth__link'>
        Already have an account? Than Login{' '}
      </NavLink>
    </div>
  );
};
