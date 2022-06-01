import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import React, {useState} from 'react';
import TabContent from 'react-bootstrap/TabContent';
import {Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import ListingList from './ListingList.jsx';
export default function ListingTabs(props) {
  const [key, setKey] = useState('home');



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
          {props.listings.length === 0 ? <PostMessage/> : <ListingList/>}
          {/*  <TabContent text='true'/> */}
        </Tab>
        <Tab eventKey="earnings" title="Earnings">
          <div style={{size: '20px'}}>You have earned a total of </div> <h1>  ${props.earnings} </h1> from {props.rentedItems} items.
        </Tab>
        <Tab eventKey="Saved" title="Saved" disabled>
        </Tab>
      </Tabs>
    </Container>
  );
}

// render(<ControlledTabs />);