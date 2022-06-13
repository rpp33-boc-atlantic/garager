import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import React, {useState} from 'react';
import TabContent from 'react-bootstrap/TabContent';
import {Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import {SiFacebook} from 'react-icons/si';
import {MdOutlineMarkEmailRead} from 'react-icons/md';
import Stack from 'react-bootstrap/Stack';
/// I may eventually delete this because I made my Table component

export default function ProfileTabs (props) {
  var user = props.user;
  // const products = props.transactions;

  return ( <Container>
    <Tabs defaultActiveKey="address" id="profileTabs" className='mb-3s'
    >
      <Tab eventKey="address" title="Reviews">
        {
          <Container className = 'profContainer'>
            <Stack gap={2}>
              <p> Reviews would go here</p>
            </Stack>
          </Container>

        }
      </Tab>
      <Tab eventKey="verified  " title="Verified With" >
        <Container className = 'profContainer'>
          <Stack gap={3}>
            <h6> facebook <SiFacebook></SiFacebook></h6>
            <h6> email <MdOutlineMarkEmailRead></MdOutlineMarkEmailRead></h6>
          </Stack>
        </Container>
      </Tab>

      {/* <Tab eventKey="Saved" title="Saved" disabled>  </Tab>*/}
    </Tabs>
  </Container>
  );

}

