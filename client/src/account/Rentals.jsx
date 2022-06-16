

import * as React from 'react';
import ReactDOM from 'react-dom';
import RentalTabs from './RentalTabs.jsx';
import { useState, useEffect } from 'react';
import getData from './getData.jsx';


export default function Rentals () {

  let [transactions, setTransactions] = useState([]);
  let [dataLoading, setDataLoading] = useState(true);

  const localId = localStorage.getItem('currentId') ? localStorage.getItem('currentId') : false;

  useEffect(()=> {

    if (dataLoading && localId ) {
      getData(localId, '/account/my-rentals').then(data => {
        setTransactions(data);
        setDataLoading(false);
      }).catch(err => {
        console.log('err ', err);
        setDataLoading(false);
        throw (err);
      });
    }


    // console.log('tr', transactions);

  }, [transactions] );

  return <RentalTabs m='auto' past = {false} transactions={transactions} />;
}


