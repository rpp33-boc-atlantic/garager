import * as React from 'react';
import ReactDOM from 'react-dom';
import ListingTabs from './ListingTabs.jsx';
import {useState, useEffect} from 'react';
import getData from './getData.jsx';


// var transactions = require('../data/dataFunctions/transactions.json');
// var items = require('../data/dataFunctions/items.json');

export default function Listings () {

  // let [transactions, setTransactions] = useState([]);
  let [items, setItems] = useState([]);
  let [dataLoading, setDataLoading] = useState(true);


  useEffect(()=> {

    if (dataLoading ) {
      getData(8, '/account/my-listings').then(data => {
        setItems(data);
        setDataLoading(false);
      });
    }

  }, [dataLoading] );



  return <ListingTabs items={items} m='auto' earnings = {454} rentedItems = {3}/>;



}
