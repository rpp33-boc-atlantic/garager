import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import React, {useState} from 'react';
import {Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
// import ListingList from './ListingList.jsx';
// import Tables from './Tables.jsx';
import StackVersionListings from './StackVersionListings.jsx';

import Earnings from './Earnings.jsx';



export default function ListingTabs(props) {
  const [key, setKey] = useState('home');

  const columns = [{
    dataField: 'title',
    text: 'Item Name',
    link: '../item',
    sort: true
  }, {
    dataField: 'price',
    text: 'Current Price per Day',
    sort: true
  }, {
    dataField: 'min_price',
    text: 'Minimum Price',
    sort: true
  },
  {
    dataField: 'photos',
    text: 'image'
  }];

  // props.items.map(item => {
  //   item.photos = item.photos === null ? [] : item.photos.split(',');
  // });

  var PostMessage = function (props) {
    return (
      <React.Fragment>
        You have no items listed.  Click<Link to='../PostItem'> here</Link> to list an item!.
      </React.Fragment>
    );

  };

  return (
    <Container>
      <Tabs defaultActiveKey="listings" id="listingTabs" className='mb-3s'>

        <Tab eventKey="listings" title="Listings">
          {/* {props.listings.length === 0 ? <PostMessage/> : <ListingList/>} */}
          {/* {props.items.length === 0 ? <PostMessage/> : <Tables columns = {columns} values = {props.items}/>} */}
          {props.items.length === 0 ? <PostMessage/> : <StackVersionListings columns = {columns} values = {props.items}/>}

        </Tab>
        <Tab eventKey="earnings" title="Earnings">
          {/* <div style={{size: '20px'}}>You have earned a total of </div> <h1>  ${props.earnings} </h1> from {props.rentedItems} items. */}
          <Container className="h-25">
            <Earnings></Earnings>
          </Container>
        </Tab>
        <Tab eventKey="Saved" title="Saved" disabled>
        </Tab>
      </Tabs>
    </Container>
  );
}

