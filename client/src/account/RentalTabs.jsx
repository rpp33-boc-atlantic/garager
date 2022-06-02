import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import React, {useState} from 'react';
import TabContent from 'react-bootstrap/TabContent';
import {Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import RentalList from './RentalList.jsx';
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


  var mapper = (transactions, items) => {
    var pastRentals = [];
    var currentRentals = [];
    items = items;
    var c = 0;
    var p = 0;
    transactions.map((t) => {

      t.title = items[Math.floor(Math.random( ) * 40)].title;
      var newDate = new Date();
      if (moment(t.dueDate).isBefore(moment(newDate))) {
        pastRentals.push(t);
        //if (moment(t.dueDate).isBefore(moment(newDate)))
      } else {
        currentRentals.push(t);
      }

    });
    // console.log('rentals first', pastRentals);
    var clickedColumn = 'startDate';
    currentRentals.sort((a, b) => { return a[clickedColumn[0]] < b[clickedColumn[0]] ? -1 : a[clickedColumn[0]] > b[clickedColumn[0]] ? 1 : 0; });
    var clickedColumn = 'dueDate';
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
            rentals[0].length === 0 ? <BrowseMessage time='current'/> : <RentalList rentals={rentals[0]}/>
          }
        </Tab>
        <Tab eventKey="past" title="Past" >
          { rentals[1].length === 0 ? <BrowseMessage time='past'/> : <RentalList rentals={rentals[1]}/>}
        </Tab>

        <Tab eventKey="Saved" title="Saved" disabled>
        </Tab>
      </Tabs>
    </Container>

  );
}

