import React from 'react';
// Importing the Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import { createRoot } from 'react-dom/client';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import * as ReactDOM from 'react-dom/client';
import App from './app.jsx';
import FAQ from './FAQ.jsx';
import RouterTest from './RouterTest.jsx';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />}>
        <Route path='FAQ' element={<FAQ />} />
        <Route path='RouterTest' element={<RouterTest />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
