
import React from 'react';
import RentalTabs from './RentalTabs.jsx';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import ThemeProvider from 'react-bootstrap/ThemeProvider';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import EarningsCard from './EarningsCard.jsx';
import ProfileTabs from './ProfileTabs.jsx';

// var transactions = require('../data/dataFunctions/transactions.json');
var users = require('../data/dataFunctions/users.json');
var user = users[0];
export default function Earnings () {

  return ( <ThemeProvider breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}>

    <Container fluid>
      <Row> profile  </Row>
      <Row>
        <Col></Col>
        <Col>
          <EarningsCard user= {user}></EarningsCard>
          {/* {/* <Image thumbnail = {true} width = {600}roundedCircle = {true} fluid = {true} src = {user.userPhoto} /> */}
        </Col >
        <Col xs={8}>
          <ProfileTabs user ={user}></ProfileTabs> (wider)
        </Col>
        <Col></Col>
      </Row>
      <Row>
      </Row>
      <Row></Row>
    </Container>
  </ThemeProvider>
  );
}

