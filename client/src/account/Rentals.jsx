

import * as React from 'react';
import ReactDOM from 'react-dom';
import RentalTabs from './RentalTabs.jsx';

// var transactions = require('../data/dataFunctions/transactions.json');
// var items = require('../data/dataFunctions/items.json');

export default function Rentals () {
  return <RentalTabs m='auto' past = {false} transactions={transactions} items={items} />;
}

