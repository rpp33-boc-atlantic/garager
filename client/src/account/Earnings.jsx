
import React from 'react';
import RentalTabs from './RentalTabs.jsx';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import ThemeProvider from 'react-bootstrap/ThemeProvider';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import EarningsCard from './EarningsCard.jsx';
import ProfileTabs from './ProfileTabs.jsx';
import '../App.css';


// var transactions = require('../data/dataFunctions/transactions.json');
var users = require('../data/dataFunctions/users.json');
var user = users[0];
export default function Earnings () {

  return ( <ThemeProvider breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}>

    <Container className='theme-yellow'>
      {/* Stack the columns on mobile by making one full-width and the other half-width */}
      <Row>
        <Col xs={12} md={8} lg={12} className='theme-blue'>
      xs=12 md=8
        </Col>
        <Col xs={6} md={4} >
      xs=6 md=4
        </Col>
      </Row>

      {/* Columns start at 50% wide on mobile and bump up to 33.3% wide on desktop */}
      <Row>
        <Col xs={6} md={4}>
      xs=6 md=4
        </Col>
        <Col xs={6} md={4}className='theme-green' >
      xs=6 md=4
        </Col>
        <Col xs={6} md={4}>
      xs=6 md=4
        </Col>
      </Row>

      {/* Columns are always 50% wide, on mobile and desktop */}
      <Row >
        <Col xs={6} className='theme-blue'>xs=6</Col>
        <Col xs={6}>xs=6</Col>
      </Row>
    </Container>
  </ThemeProvider>
  );
}

