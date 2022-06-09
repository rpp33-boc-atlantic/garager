import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import React, {useState} from 'react';
import TabContent from 'react-bootstrap/TabContent';
import {Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Tables from './Tables.jsx';
/// I may eventually delete this because I made my Table component

export default function ProfileTabs (props) {
  var user = props.user;
  // const products = props.transactions;

  return ( <Container>
    <Tabs defaultActiveKey="address" id="profileTabs" className='mb-3s'
    >
      <Tab eventKey="address" title="Address">
        {
          <div>{user.address}</div>
        // rentals[0].length === 0 ? <BrowseMessage time='current'/> : <RentalList rentals={rentals[0]}/>
          // rentals[0].length === 0 ? <BrowseMessage time='current'/> : <Tables columns = {columns} values={rentals[0]}/>
        }
      </Tab>
      <Tab eventKey="verified  " title="Verified With" >
        {/* { rentals[1].length === 0 ? <BrowseMessage time='past'/> : <Tables columns = {columns} values={rentals[1]}/>} */}
        {/* { rentals[1].length === 0 ? <BrowseMessage time='past'/> : <RentalList rentals={rentals[1]}/>} */}
      </Tab>

      <Tab eventKey="Saved" title="Saved" disabled>
      </Tab>
    </Tabs>
  </Container>
  );

}

