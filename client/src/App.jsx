import React, { useState, useEffect } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
// placeholder for checkout button until linked with ItemView
import CheckoutButton from './checkout/CheckoutButton.jsx';
import CheckoutSuccess from './checkout/CheckoutSuccess.jsx';
import CheckoutCancel from './checkout/CheckoutCancel.jsx';

// import NavBar from './account/NavBar.jsx';
const App = () => {
  let navigate = useNavigate();

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);

    if (query.get('success')) {
      navigate('/CheckoutSuccess');
    }

    if (query.get('canceled')) {
      navigate('/CheckoutCancel');
    }
  });

  return (
    <div>
      {/* <h1>Garager</h1> */}
      {/* <nav className="navbar navbar-light bg-light"style={{marginBottom: '20px'}}>
        <Link style={{marginRight: '10px'}} to='FAQ'>FAQ</Link>
        <Link style={{marginRight: '10px'}} to='RouterTest'>RouterTest</Link>
        <Link style={{marginRight: '10px'}} to='SearchBrowse'>Browse</Link>
        <Link style={{marginRight: '10px'}} to='PostItem'>Post Item</Link>
        <Link style={{marginRight: '10px'}} to='Messages'>Messages</Link>
        <NavLinks/>


      </nav> */}
      <Outlet/>
      {/* /<CheckoutButton /> */}
      {/* I commented this out because I think Jo implemented it on Rudy's page already. */}

    </div>

  );
};

export default App;

/* <-- COMMENT OUT ABOVE CODE AND UNCOMMENT FROM THIS POINT TO SEE THIS IN THE BROWSER

// Below is an example of how we can use React Bootstrap for our app.
// Example CSS file named App-CSS-Example.css.
// Taken from 'Basic Example' in https://github.com/react-bootstrap/code-sandbox-examples/blob/master/README.md.
// Check out the 'Basic Example with React-Router-Bootstrap' so we can navigate to different pages.

import React, { useState } from 'react';

import Toast from 'react-bootstrap/Toast';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

import './App-CSS-Example.css';

const ExampleToast = ({ children }) => {
  const [show, toggleShow] = useState(true);

  return (
    <>
      {!show && <Button onClick={() => toggleShow(true)}>Show Toast</Button>}
      <Toast show={show} onClose={() => toggleShow(false)}>
        <Toast.Header>
          <strong className="mr-auto">React-Bootstrap</strong>
        </Toast.Header>
        <Toast.Body>{children}</Toast.Body>
      </Toast>
    </>
  );
};

const App = () => (
  <Container className="p-3">
    <Container className="p-5 mb-4 bg-light rounded-3">
      <h1 className="header">Welcome To React-Bootstrap</h1>
      <ExampleToast>
        We now have Toasts
        <span role="img" aria-label="tada">
          🎉
        </span>
      </ExampleToast>
    </Container>
  </Container>
);

export default App;
*/

/* <-- COMMENT OUT ABOVE CODE AND UNCOMMENT FROM THIS POINT TO SEE THIS IN THE BROWSER

// Below is an example of how we can use Material UI for our app.
// Example taken from https://mui.com/material-ui/getting-started/usage/

import * as React from 'react';
import ReactDOM from 'react-dom';
import Button from '@mui/material/Button';

function App() {
  return <Button variant="contained">Hello World</Button>;
}

export default App;
*/
