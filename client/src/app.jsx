import React from 'react';
import { Outlet, Link } from 'react-router-dom';

import PostItem from './postItem/postItem.jsx';

const App = () => {
  return (
    <div>
      <h1>Garager</h1>
      <nav>
        <Link to='FAQ'>FAQ</Link>
        <Link to='RouterTest'>RouterTest</Link>
      </nav>
      <Outlet />
      <PostItem />
    </div>
  );
};

export default App;