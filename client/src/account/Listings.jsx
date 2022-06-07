import * as React from 'react';
import ReactDOM from 'react-dom';
import ListingTabs from './ListingTabs.jsx';
import {useState, useEffect} from 'react';
const axios = require('axios');


// var transactions = require('../data/dataFunctions/transactions.json');
// var items = require('../data/dataFunctions/items.json');

export default function Listings () {

  let [transactions, setTransactions] = useState([]);
  let [items, setItems] = useState([]);
  let [dataLoading, setDataLoading] = useState(true);

  var getData = (id)=>{

    return axios.get('/account/my-listings', {
      params: {
        // eslint-disable-next-line camelcase
        id: id
      }
    })
      .then(function (response) {
        console.log('data returned', response.data);
        setItems(response.data);
        setDataLoading(false);
      })
      .catch(function (error) {
        console.log('error', error);
      })
      .then(function () {
      // always executed
      });

  };

  useEffect(()=> {
    dataLoading ? getData(11) : null;
    console.log('tr', transactions);

  }, [transactions] );

  // UPDATE transactions
  //  SET owner_id = 11
  //  WHERE item_id = 37;

  // /items={items} transactions = {transactions}

  return <ListingTabs items={items} m='auto' earnings = {454} rentedItems = {3}/>;

}

