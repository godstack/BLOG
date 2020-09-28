import React, { useEffect } from 'react';
import { useRoutes } from './routes';
import { useDispatch, useSelector } from 'react-redux';
import { requestCheckAuth } from './redux/actions';
import { Loader } from './components/Loader/Loader';
import { Header } from './components/Header/Header';

function App() {
  const dispatch = useDispatch();

  const loading = useSelector(state => state.session.loading);

  useEffect(() => {
    dispatch(requestCheckAuth());
  }, [dispatch]);

  const isAuthorized = useSelector(state => !!state.session.user.userId);
  const routes = useRoutes(isAuthorized);

  if (loading) {
    return (
      <div className='app-loader-wrapper loader-bg'>
        <Loader />
      </div>
    );
  }

  return (
    <>
      {isAuthorized && <Header />}
      <main> {routes}</main>
    </>
  );
}

export default App;
