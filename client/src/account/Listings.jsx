import * as React from 'react';
import ReactDOM from 'react-dom';
import ListingTabs from './ListingTabs.jsx';
import {useState, useEffect} from 'react';
import getData from './getData.jsx';





export default function Listings () {

  let [items, setItems] = useState([]);
  let [dataLoading, setDataLoading] = useState(true);
  const localId = localStorage.getItem('currentId') ? localStorage.getItem('currentId') : false;

  useEffect(()=> {

    if (dataLoading && localId ) {
      getData(localId, '/account/my-listings').then(data => {
        setItems(data);
        setDataLoading(false);
      }).catch(err => {
        console.log('err ', err);
        setDataLoading(false);
        throw (err);
      });
    }

  }, [dataLoading] );



  return <ListingTabs items={items} m='auto' />;



}
