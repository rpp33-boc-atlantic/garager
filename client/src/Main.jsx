import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createRoot } from 'react-dom/client';
import {
  BrowserRouter,
  Routes,
  Route,
  useParams
} from 'react-router-dom';
import App from './App.jsx';
import Item from './itemView/wrapper.jsx';
import SearchBrowse from './search/SearchBrowse.jsx';
import PostItem from './postItem/PostItem.jsx';
import Messages from './messages/Messages.jsx';
import Signup from './authentication/signup.jsx';
import Login from './authentication/login.jsx';
import {UserAuthContextProvider} from './context/UserAuthContext.jsx';
import {MainContextProvider} from './context/MainContext.jsx';
import Rentals from './account/Rentals.jsx';
import Listings from './account/Listings.jsx';
import Homepage from './Homepage.jsx';
import CheckoutSuccess from './checkout/CheckoutSuccess.jsx';
import CheckoutCancel from './checkout/CheckoutCancel.jsx';
import StripeAccountSetup from './checkout/StripeAccountSetup.jsx';
import NavLinks from './utils/NavLinks.jsx';
import { io } from 'socket.io-client';
import PrivateRoute from './authentication/privateRoute.jsx';

// sets up client for socketIO connection
const socketIO = io();

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <BrowserRouter>
    <UserAuthContextProvider>
      <NavLinks socketIO={ socketIO }/>
      <Routes>
        <Route path='/home' element={<Homepage />}/>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/' exact element={<PrivateRoute><App /></PrivateRoute>}>
          <Route path='Item/:id' element={<PrivateRoute><Item /></PrivateRoute>} />
          <Route path='SearchBrowse' element={<PrivateRoute><SearchBrowse /></PrivateRoute>} />
          <Route path='PostItem' element={<PrivateRoute><PostItem /></PrivateRoute>} />
          <Route path='Messages' element={<PrivateRoute><Messages socketIO={ socketIO }/></PrivateRoute>} />
          <Route path='my-listings' element={<PrivateRoute><Listings /></PrivateRoute>} />
          <Route path='my-rentals' element={<PrivateRoute><Rentals /></PrivateRoute>} />
          <Route path='/CheckoutSuccess' element={<PrivateRoute><CheckoutSuccess /></PrivateRoute>} />
          <Route path='/CheckoutCancel' element={<PrivateRoute><CheckoutCancel /></PrivateRoute>} />
          <Route path='/Stripe-Account-Setup' element={<PrivateRoute><StripeAccountSetup /></PrivateRoute>} />
        </Route>
      </Routes>
    </UserAuthContextProvider>
  </BrowserRouter>
);
