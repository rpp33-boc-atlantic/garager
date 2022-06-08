import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import React, {useState} from 'react';
import TabContent from 'react-bootstrap/TabContent';
import {Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
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
    sort: true,
    param: 'item_id'
  }, {
    dataField: 'owner',
    text: 'Owner',
    link: '../profile',
    sort: true,
    param: 'owner_id'
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
    // iterate through items and sort by past or current
    if (transactions) {
      transactions.map((t) => {
        var newDate = new Date();
        if (moment(t.returndate).isBefore(moment(newDate))) {
          pastRentals.push(t);

        } else {
          currentRentals.push(t);
        }

      });
    }


    var clickedColumn = 'pickupdate';
    currentRentals.sort((a, b) => { return a[clickedColumn[0]] < b[clickedColumn[0]] ? -1 : a[clickedColumn[0]] > b[clickedColumn[0]] ? 1 : 0; });
    var clickedColumn = 'returndate';
    pastRentals.sort((a, b) => { return a[clickedColumn[0]] < b[clickedColumn[0]] ? -1 : a[clickedColumn[0]] > b[clickedColumn[0]] ? 1 : 0; });
    // console.log('rentals second', pastRentals);
    // console.log('Current', currentRentals);
    // console.log('items', items);
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

// UPDATE items
//         SET latlng = (select replace(latlng, '|', ',lng:') from items where s.item_id = item_id) as s;
//      select latlng from (select item_id, latlng from items where item_id = 2) as s;

// update items
//   set latlng = case
//             when item_id >= 0 then replace(latlng, 'lng','"lng"')
//             else latlng
//           end;
