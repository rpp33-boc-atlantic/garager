

import * as React from 'react';
import ReactDOM from 'react-dom';
import RentalTabs from './RentalTabs.jsx';

var transactions = require('../../../server/database/transactions.json');
var items = require('../../../server/database/items.json');

export default function Rentals () {
  return <RentalTabs m='auto' past = {false} transactions={transactions} items={items} />;
}

