import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { ProfilePage } from './pages/ProfilePage/ProfilePage';
import { LoginPage } from './pages/AuthPages/LoginPage';
import { RegisterPage } from './pages/AuthPages/RegisterPage';
import { HomePage } from './pages/HomePage/HomePage';
import { CreatePage } from './pages/CreatePage/CreatePage';

export const useRoutes = isAuthenticated => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path='/profile' exact component={ProfilePage} />
        <Route path='/home' exact component={HomePage} />
        <Route path='/create-page' exact component={CreatePage} />
        <Redirect to='/profile' />
      </Switch>
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
