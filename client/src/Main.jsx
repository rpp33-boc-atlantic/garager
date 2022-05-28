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


const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <BrowserRouter>
    <NavLinks/>
    <UserAuthContextProvider>
      <Routes>
        <Route path='/home' element={<Homepage />} />
        <Route path='/' exact element={<App />}>
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='FAQ' element={<FAQ />} />
          <Route path='Item' element={<Item />} />
          <Route path='PostItem' element={<PostItem />} />
          <Route path='Messages' element={<Messages />} />
          <Route path='my-listings' element={<Listings />} />
          <Route path='my-rentals' element={<Rentals />} />
          <Route path='/CheckoutSuccess' element={<CheckoutSuccess />} />
          <Route path='/CheckoutCancel' element={<CheckoutCancel />} />
        </Route>
      </Routes>
    </UserAuthContextProvider>
  </BrowserRouter>
);


