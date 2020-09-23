import React from 'react';
import { NavLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { requestLogin } from '../../redux/actions';
import './AuthPage.scss';

export const LoginPage = () => {
  const { register, errors, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const loading = useSelector(state => state.session.loading);

  const onSubmit = async formData => {
    try {
      dispatch(requestLogin({ ...formData }));
    } catch (e) {}
  };

  return (
    <div className='auth-page'>
      <h2 className='auth__header'>Sign In</h2>
      <form className='auth-form' onSubmit={handleSubmit(onSubmit)}>
        <div className='input-field'>
          <input
            ref={register({
              required: 'FIELD IS REQUIRED'
            })}
            name='emailOrUsername'
            placeholder='Email or Username'
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

        <input type='submit' className='btn' value='Login' disabled={loading} />
      </form>

      <NavLink to='/register' className='auth__link'>
        Still don't have an account? Than Register
      </NavLink>
    </div>
  );
};
