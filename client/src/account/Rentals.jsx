

import * as React from 'react';
import ReactDOM from 'react-dom';
import RentalTabs from './RentalTabs.jsx';
import {useState, useEffect} from 'react';
import getData from './getData.jsx';

// const axios = require('axios');

var transactions = require('../../../server/database/transactions.json');
var items = require('../../../server/database/items.json');

export default function Rentals () {

  let [transactions, setTransactions] = useState([]);
  let [dataLoading, setDataLoading] = useState(true);

  const localId = localStorage.getItem('userId') ? localStorage.getItem('userId') : false;

  useEffect(()=> {

    if (dataLoading && localId ) {
      getData(localId, '/account/my-rentals').then(data => {
        setTransactions(data);
        setDataLoading(false);
      });
    }


    // console.log('tr', transactions);

  }, [transactions] );

  return <RentalTabs m='auto' past = {false} transactions={transactions} />;
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
