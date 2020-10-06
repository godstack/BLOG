import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { ProfilePage } from './pages/ProfilePage/ProfilePage';
import { LoginPage } from './pages/AuthPages/LoginPage';
import { RegisterPage } from './pages/AuthPages/RegisterPage';
import { HomePage } from './pages/HomePage/HomePage';
import { CreatePage } from './pages/CreatePage/CreatePage';
import { useSelector } from 'react-redux';
import { UsersPage } from './pages/UsersPage/UsersPage';
import { SettingsProfilePage } from './pages/SettingsProfilePage/SettingsProfilePage';

export const useRoutes = isAuthenticated => {
  const { username } = useSelector(state => state.session.user);

  if (isAuthenticated) {
    return (
      <section className='workspace'>
        <Switch>
          <Route path='/profile/:username' exact component={ProfilePage} />
          <Route path='/home' exact component={HomePage} />
          <Route path='/create-post' exact component={CreatePage} />

          <Route
            path={[
              '/:username/followers',
              '/:username/following',
              '/all-users'
            ]}
            exact
            component={UsersPage}
          />
          <Route
            path='/settings/profile'
            exact
            component={SettingsProfilePage}
          />

          <Redirect to={`/profile/${username}`} />
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
