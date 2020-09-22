import React from 'react';
import './AuthPage.scss';
import { useForm } from 'react-hook-form';

export const LoginPage = () => {
  const { register, errors, handleSubmit } = useForm();
  return (
    <div className='auth-page'>
      <h2 className='auth__header'>Sign In</h2>
      <form></form>
    </div>
  );
};
