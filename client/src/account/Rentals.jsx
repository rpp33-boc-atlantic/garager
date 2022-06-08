

import * as React from 'react';
import ReactDOM from 'react-dom';
import RentalTabs from './RentalTabs.jsx';
import {useState, useEffect} from 'react';
import getData from './getData.jsx';

const axios = require('axios');

var transactions = require('../../../server/database/transactions.json');
var items = require('../../../server/database/items.json');

export default function Rentals () {

  let [transactions, setTransactions] = useState(null);
  let [dataLoading, setDataLoading] = useState(true);

  // var getData = (id)=>{

  //   return axios.get('/account/my-rentals', {
  //     params: {
  //       // eslint-disable-next-line camelcase
  //       id: id
  //     }
  //   })
  //     .then(function (response) {
  //       console.log('data returned', response.data);
  //       setTransactions(response.data);
  //       setDataLoading(false);
  //     })
  //     .catch(function (error) {
  //       console.log('error', error);
  //     })
  //     .then(function () {
  //     // always executed
  //     });

  // };

  useEffect(()=> {
    // dataLoading ? getData(9) : null;


    // var data = dataLoading ? getData2(9) : null;

    // !dataloading ? setTransactions(data) : null;
    if (dataLoading ) {
      getData(9, '/account/my-rentals').then(data => {
        setTransactions(data);
        setDataLoading(false);
      });
    }


    // console.log('tr', transactions);

  }, [transactions] );


  //items={items}
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
