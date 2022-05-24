import React from 'react';
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
import Messages from './messages/messages.jsx';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />}>
        <Route path='FAQ' element={<FAQ />} />
        <Route path='RouterTest' element={<RouterTest />} />
        <Route path='Messages' element={<Messages />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
