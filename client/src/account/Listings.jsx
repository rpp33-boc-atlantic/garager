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
    dataLoading ? getData(6) : null;
    console.log('tr', transactions);

  }, [transactions] );

  // items={items} transactions = {transactions}

  return <ListingTabs items={items} m='auto' earnings = {454} rentedItems = {3}/>;

  // alter table items alter collum photos

}
UPDATE items
SET photos = '{"https://edge.images.sidelineswap.com/production/030/233/348/7332ed9182c5a39e_original.jpeg?height=56&width=56","https://edge.images.sidelineswap.com/production/030/233/370/cb51d2972862aad3_original.jpeg?height=56&width=56","https://edge.images.sidelineswap.com/production/030/233/408/0ca86de48ec24d01_original.jpeg?height=56&width=56"}'::text[],
itemdescription = 'Volkl Downhill Skiing Boys Downhill Ski Combo',
price=30,
title='Volkl Jr Rtm 110 Cm Boys Downhill Ski Combo',
brand='Volkl',
model='RTM'
where item_id = 36;
// UPDATE items

// where item_id = 19;
// SET title = 'LEDIDO 5.6 FT Christmas Inflatable Decoration Santa Claus Xmas Giant Lighted '

// /   UPDATE items
//     SET photos = '[https://images-us-prod.cms.commerce.dynamics.com/cms/api/nwtfklkdlc/imageFileData/search?fileName=/Products%2FOB2201733_000_001.png&m=6&q=80&cropfocalregion=true","https://images-us-prod.cms.commerce.dynamics.com/cms/api/nwtfklkdlc/imageFileData/search?fileName=/Products%2FOB2201733_000_002.png&m=6&q=80&cropfocalregion=true]'
//     WHERE photos is null;



// UPDATE items
// SET photos = '{}'
// where photos = null

//     WHERE photos = '';

//     ALTER TABLE items
//     ALTER COLUMN photos TYPE TEXT [] USING photos::text[];