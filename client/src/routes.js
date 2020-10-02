import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { ProfilePage } from './pages/ProfilePage/ProfilePage';
import { LoginPage } from './pages/AuthPages/LoginPage';
import { RegisterPage } from './pages/AuthPages/RegisterPage';
import { HomePage } from './pages/HomePage/HomePage';
import { CreatePage } from './pages/CreatePage/CreatePage';
import { PostPage } from './pages/PostPage/PostPage';
import { useSelector } from 'react-redux';
import { UsersPage } from './pages/UsersPage.js/UsersPage';
import { ExplorePage } from './pages/ExplorePage.js/ExplorePage';

export const useRoutes = isAuthenticated => {
  const { username } = useSelector(state => state.session.user);

  if (isAuthenticated) {
    return (
      <section className='workspace'>
        <Switch>
          <Route path='/profile/:username' exact component={ProfilePage} />
          <Route path='/home' exact component={HomePage} />
          <Route path='/create-post' exact component={CreatePage} />
          <Route path='/post/:postId' component={PostPage} />
          <Route
            path={['/:username/followers', '/:username/following']}
            exact
            component={UsersPage}
          />
          <Route path='/explore' exact component={ExplorePage} />

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
