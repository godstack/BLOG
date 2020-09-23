import React from 'react';
import { useRoutes } from './routes';
import { BrowserRouter as Router } from 'react-router-dom';
import { useSelector } from 'react-redux';

function App() {
  const isAuthorized = useSelector(state => !!state.session.userId);
  debugger;
  const routes = useRoutes(isAuthorized);

  return (
    <Router>
      <main>{routes}</main>
    </Router>
  );
}

export default App;
