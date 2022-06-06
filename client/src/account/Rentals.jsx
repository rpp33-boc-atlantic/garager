

import * as React from 'react';
import ReactDOM from 'react-dom';
import RentalTabs from './RentalTabs.jsx';
const axios = require('axios');

// var transactions = require('../data/dataFunctions/transactions.json');
var items = require('../data/dataFunctions/items.json');

import {useState, useEffect} from 'react';

export default function Rentals () {

  let [transactions, setTransactions] = useState(null);
  let [dataLoading, setDataLoading] = useState(true);

  var getData = (id)=>{

    return axios.get('/account/my-rentals', {
      params: {
        // eslint-disable-next-line camelcase
        item_id: id
      }
    })
      .then(function (response) {
        console.log('data returned', response.data);
        setTransactions(response.data);
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
    dataLoading ? getData(3333) : null;
    console.log('tr', transactions);

  }, [transactions] );



  return <RentalTabs m='auto' past = {false} transactions={transactions} items={items} />;
}




// Make a request for a user with a given ID
// axios.get('/user?ID=12345')
//   .then(function (response) {
//     // handle success
//     console.log(response);
//   })
//   .catch(function (error) {
//     // handle error
//     console.log(error);
//   })
//   .then(function () {
//     // always executed
//   });

// Optionally the request above could also be done as
