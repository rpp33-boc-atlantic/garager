import * as React from 'react';
import ReactDOM from 'react-dom';
import ListingTabs from './ListingTabs.jsx';

var transactions = require('../../../server/database/transactions.json');
var items = require('../../../server/database/items.json');

export default function Listings () {

  return <ListingTabs transactions = {transactions} items={items} m='auto' earnings = {454} rentedItems = {3}/>;
}

// 