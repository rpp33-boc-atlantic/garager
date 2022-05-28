import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import React, {useState} from 'react';
import TabContent from 'react-bootstrap/TabContent';
import {Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';


export default function RentalTabs(props) {
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
        <Tab eventKey="Upcoming" title="Upcoming" className="d-flex p-2">
          {/* <Sonnet /> */}
        :[ You have no current listings.  Click {<Link to='../Browse'> here</Link>} Browse nearby items.
          <TabContent text='true'/>
        </Tab>
        <Tab eventKey="Past" title="Past" className="d-flex p-2">
          You have no Past items.  Would you like to search for a Time Machine to fix that?  Browse our rentals here.
        </Tab>
        <Tab eventKey="Saved" title="Saved" disabled>
          {/* <Sonnet /> */}Teage
        </Tab>
      </Tabs>
    </Container>
  );
}

// render(<RentalTabs />);