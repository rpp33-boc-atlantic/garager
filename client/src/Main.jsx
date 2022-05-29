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
import SearchBrowse from './search/SearchBrowse.jsx';
import PostItem from './postItem/postItem.jsx';
import Messages from './messages/Messages.jsx';
import Signup from './authentication/signup.jsx';
import Login from './authentication/login.jsx';
import {UserAuthContextProvider} from './context/UserAuthContext.jsx';
import Rentals from './account/Rentals.jsx';
import Listings from './account/Listings.jsx';
import Homepage from './Homepage.jsx';
import Account from './account/Account.jsx';
import CheckoutSuccess from './checkout/CheckoutSuccess.jsx';
import CheckoutCancel from './checkout/CheckoutCancel.jsx';
import NavLinks from './utils/NavLinks.jsx';
import PrivateRoute from './authentication/privateRoute.jsx';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <BrowserRouter>
    <NavLinks/>
    <UserAuthContextProvider>
      <Routes>
        <Route path='/home' element={<Homepage />}/>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/' exact element={<PrivateRoute><App /></PrivateRoute>}>
          <Route path='FAQ' element={<PrivateRoute><FAQ /></PrivateRoute>} />
          <Route path='RouterTest' element={<RouterTest />} />
          <Route path='Item' element={<PrivateRoute><Item /></PrivateRoute>} />
          <Route path='SearchBrowse' element={<PrivateRoute><SearchBrowse /></PrivateRoute>} />
          <Route path='PostItem' element={<PrivateRoute><PostItem /></PrivateRoute>} />
          <Route path='Messages' element={<PrivateRoute><Messages /></PrivateRoute>} />
          <Route path='my-listings' element={<PrivateRoute><Listings /></PrivateRoute>} />
          <Route path='my-rentals' element={<PrivateRoute><Rentals /></PrivateRoute>} />
          <Route path='/CheckoutSuccess' element={<PrivateRoute><CheckoutSuccess /></PrivateRoute>} />
          <Route path='/CheckoutCancel' element={<PrivateRoute><CheckoutCancel /></PrivateRoute>} />
        </Route>
      </Routes>
    </UserAuthContextProvider>
  </BrowserRouter>
);


