import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import React, {useState} from 'react';
import TabContent from 'react-bootstrap/TabContent';
import {Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
export default function ControlledTabs(props) {
  const [key, setKey] = useState('home');

  return (
    <Container>
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
        // centered
        // class="d-flex p-2"
      >
        <Tab eventKey="Listings" title="Listings" className="d-flex p-2">
          {/* <Sonnet /> */}
        :[ You have no current listings.  Click {<Link to='../PostItem'> here</Link>} to list an item
          <TabContent text='true'/>
        </Tab>
        <Tab eventKey="Earnings" title="Earnings">
          {/* <Sonnet /> */}
          <div style={{size: '20px'}}>You have earned a total of </div> <h1>  ${props.earnings} </h1> from {props.rentedItems} items.
        </Tab>
        <Tab eventKey="Saved" title="Saved" disabled>
          {/* <Sonnet /> */}Teage
        </Tab>
      </Tabs>
    </Container>
  );
}

// render(<ControlledTabs />);