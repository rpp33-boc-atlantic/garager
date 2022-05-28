// Below is an example of how we can use Material UI for our app.
// Example taken from https://mui.com/material-ui/getting-started/usage/

import * as React from 'react';
import ReactDOM from 'react-dom';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import RentalTabs from './RentalTabs.jsx';


export default function Rentals () {
  // return <Button variant="contained">Hello World</Button>;
  // return <BasicTabs listings = {false} m='auto' earnings = {454} rentedItems = {3}/>;
  return <RentalTabs current = {false} m='auto' past = {false} />;

}

