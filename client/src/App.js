import React, { useEffect } from 'react';
import { useRoutes } from './routes';
import { BrowserRouter as Router } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { requestCheckAuth } from './redux/actions';
import { Loader } from './components/Loader/Loader';

function App() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.session.loading);

  useEffect(() => {
    dispatch(requestCheckAuth());
  }, []);

  const isAuthorized = useSelector(state => !!state.session.userId);

  const routes = useRoutes(isAuthorized);

  if (loading) {
    return (
      <div className='app-loader-wrapper'>
        <Loader />
      </div>
    );
  }

  return (
    <Router>
      <main>{routes}</main>
    </Router>
  );
}

export default App;
