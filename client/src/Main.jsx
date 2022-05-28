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
import App from './App.jsx';
import FAQ from './FAQ.jsx';
import RouterTest from './RouterTest.jsx';
import Item from './itemView/wrapper.jsx';
import PostItem from './postItem/postItem.jsx';
import Messages from './messages/Messages.jsx';
import Homepage from './Homepage.jsx';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/home' element={<Homepage />} />
      <Route path='/' exact element={<App />}>
        <Route path='FAQ' element={<FAQ />} />
        <Route path='RouterTest' element={<RouterTest />} />
        <Route path='Item' element={<Item />} />
        <Route path='PostItem' element={<PostItem />} />
        <Route path='Messages' element={<Messages />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
