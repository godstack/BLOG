import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { ProfilePage } from './pages/ProfilePage/ProfilePage';
import { LoginPage } from './pages/AuthPages/LoginPage';
import { RegisterPage } from './pages/AuthPages/RegisterPage';
import { HomePage } from './pages/HomePage/HomePage';
import { CreatePage } from './pages/CreatePage/CreatePage';
import { PostPage } from './pages/PostPage/PostPage';

export const useRoutes = isAuthenticated => {
  if (isAuthenticated) {
    return (
      <section className='workspace'>
        <Switch>
          <Route path='/profile' exact component={ProfilePage} />
          <Route path='/home' exact component={HomePage} />
          <Route path='/create-post' exact component={CreatePage} />
          <Route path='/post' exact component={PostPage} />
          <Redirect to='/profile' />
        </Switch>
      </section>
    );
  }

  return (
    <Switch>
      <Route path='/login' exact component={LoginPage} />
      <Route path='/register' exact component={RegisterPage} />
      <Redirect to='/login' />
    </Switch>
  );
};
