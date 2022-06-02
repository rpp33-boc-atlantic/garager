// Below is an example of how we can use Material UI for our app.
// Example taken from https://mui.com/material-ui/getting-started/usage/

import * as React from 'react';
import ReactDOM from 'react-dom';

import ListingTabs from './ListingTabs.jsx';


export default function Listings () {

  return <ListingTabs listings = {[2, 2]} m='auto' earnings = {454} rentedItems = {3}/>;

}
