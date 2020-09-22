import React from 'react';
import { useRoutes } from './routes';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  const routes = useRoutes(false);

  return (
    <Router>
      <main>{routes}</main>
    </Router>
  );
}

export default App;
