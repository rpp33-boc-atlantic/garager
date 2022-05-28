// Below is an example of how we can use Material UI for our app.
// Example taken from https://mui.com/material-ui/getting-started/usage/

import * as React from 'react';
import ReactDOM from 'react-dom';

import ControlledTabs from './ControlledTabs.jsx';


var Listings = function() {

  return <ControlledTabs listings = {false} m='auto' earnings = {454} rentedItems = {3}/>;

};

export default Listings;