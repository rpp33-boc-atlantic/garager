import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const App = () => {
  return (
    <div>
      <h1>Garager</h1>
      <nav>
        <Link to='FAQ'>FAQ</Link>
        <Link to='RouterTest'>RouterTest</Link>
        <Link to='Messages'>Messages</Link>
      </nav>
      <Outlet />
    </div>
  );
};

export default App;