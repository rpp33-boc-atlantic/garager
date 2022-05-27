// Below is an example of how we can use Material UI for our app.
// Example taken from https://mui.com/material-ui/getting-started/usage/

import * as React from 'react';
import ReactDOM from 'react-dom';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import BasicTabs from './BasicTabs.jsx';
import CenteredTabs from './CenteredTabs.jsx';
import ControlledTabs from './ControlledTabs.jsx';


var Listings = function() {
  // return <Button variant="contained">Hello World</Button>;
  // return <BasicTabs listings = {false} m='auto' earnings = {454} rentedItems = {3}/>;
  return <ControlledTabs listings = {false} m='auto' earnings = {454} rentedItems = {3}/>;

};

export default Listings;