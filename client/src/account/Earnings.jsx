
import React, { useState, useEffect } from 'react';
import RentalTabs from './RentalTabs.jsx';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import ThemeProvider from 'react-bootstrap/ThemeProvider';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import EarningsCard from './EarningsCard.jsx';
import ProfileTabs from './ProfileTabs.jsx';
import '../App.css';
import getData from './getData.jsx';


export default function Earnings () {

  let [earnings, setEarnings] = useState([]);
  let [dataLoading, setDataLoading] = useState(true);
  const localId = localStorage.getItem('currentId') ? localStorage.getItem('currentId') : false;

  useEffect(()=> {
    if (dataLoading && localId) {
      getData(localId, '/account/my-earnings')
        .then(data => {
          setEarnings(data);
          setDataLoading(false);
        });
    }
  }, [dataLoading, earnings]);

  // THIS COMPONENT DISPLAYS DATA ON PAST WEEK, MONTH and TOTAL EARNINGS

  return ( <ThemeProvider breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}>

    <Container className='theme-green' style={{display: 'flex', marginTop: '1%'}} >
      <Row style={{margin: 'auto', paddingTop: '20px', paddingBottom: '20px'}}>
        <Col xs={12} md={12}lg={4} className='theme-blue justify-content-md-center' >
          <EarningsCard values={earnings} duration='Weekly'/>
        </Col>
        <Col xs={12} md={12} lg={4} className='justify-content-md-center' >
          <EarningsCard className="justify-content-md-center" values={earnings} duration='Monthly'/>
        </Col>
        <Col xs={12} md={12}lg={4} className='theme-blue justify-content-md-center'>
          <EarningsCard className="justify-content-md-center" values={earnings} duration='Total'/>
        </Col>
      </Row>
    </Container>
  </ThemeProvider>
  );
}

