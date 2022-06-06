import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import React, {useState} from 'react';
import TabContent from 'react-bootstrap/TabContent';
import {Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import RentalList from './RentalList.jsx';
import Tables from './Tables.jsx';

import moment from 'moment';

/* This component takes an input array of data and mapts it to table rows
  depending on whether the user has data, it will display that data or a message to send them to another page
*/

var BrowseMessage = function (props) {

  return (
    <React.Fragment>
      You have no {props.time} transactions.  Click<Link to='../SearchBrowse'> here</Link> to browse nearby items.
    </React.Fragment>
  );

};

export default function RentalTabs(props) {
  const [key, setKey] = useState('home');

  // these are the settings for the Table component
  const columns = [{
    dataField: 'title',
    text: 'Item Name',
    link: '../item',
    sort: true
  }, {
    dataField: 'rate',
    text: 'Current Price per Day',
    sort: true
  }, {
    dataField: 'pickupdate',
    text: 'Checkout Date',
    sort: true
  },
  {
    dataField: 'returndate',
    text: 'Return Date',
    sort: true
  },
  {
    dataField: 'photos',
    text: 'image'
  }];

  var pastRentals = [];
  var currentRentals = [];

  var mapper = (transactions, items) => {

    items = items;
    var c = 0;
    var p = 0;
    if (transactions) {
      transactions.map((t) => {
        t.title = items[Math.floor(Math.random( ) * 40)].title;
        t.photos = items[1]['photos'];
        var newDate = new Date();
        if (moment(t.returndate).isBefore(moment(newDate))) {
          pastRentals.push(t);

        } else {
          currentRentals.push(t);
        }

      });
    }

    // console.log('rentals first', pastRentals);
    var clickedColumn = 'pickupdate';
    currentRentals.sort((a, b) => { return a[clickedColumn[0]] < b[clickedColumn[0]] ? -1 : a[clickedColumn[0]] > b[clickedColumn[0]] ? 1 : 0; });
    var clickedColumn = 'returndate';
    pastRentals.sort((a, b) => { return a[clickedColumn[0]] < b[clickedColumn[0]] ? -1 : a[clickedColumn[0]] > b[clickedColumn[0]] ? 1 : 0; });
    // console.log('rentals second', pastRentals);
    console.log('Current', currentRentals);
    console.log('Past', pastRentals);
    return [currentRentals, pastRentals];
  };

  var rentals = mapper(props.transactions, props.items);

  return (

    <Container>
      <Tabs defaultActiveKey="upcoming" id="rentalTabs" className='mb-3s'
      >
        <Tab eventKey="upcoming" title="Upcoming">
          {
            // rentals[0].length === 0 ? <BrowseMessage time='current'/> : <RentalList rentals={rentals[0]}/>
            rentals[0].length === 0 ? <BrowseMessage time='current'/> : <Tables columns = {columns} values={rentals[0]}/>
          }
        </Tab>
        <Tab eventKey="past" title="Past" >
          { rentals[1].length === 0 ? <BrowseMessage time='past'/> : <Tables columns = {columns} values={rentals[1]}/>}
          {/* { rentals[1].length === 0 ? <BrowseMessage time='past'/> : <RentalList rentals={rentals[1]}/>} */}
        </Tab>

        <Tab eventKey="Saved" title="Saved" disabled>
        </Tab>
      </Tabs>
    </Container>

  );
}

