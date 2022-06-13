
import React from 'react';
import RentalTabs from './RentalTabs.jsx';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import ThemeProvider from 'react-bootstrap/ThemeProvider';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProfileCard from './ProfileCard.jsx';
import ProfileTabs from './ProfileTabs.jsx';
import getData from './getData.jsx';
import {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { useUserAuth } from '../context/UserAuthContext.jsx';


export default function Profile () {

  let [profile, setProfile ] = useState([]);
  let [dataLoading, setDataLoading] = useState(true);
  const localId = localStorage.getItem('currentId');
  let [accountOwner, setAccountOwner] = useState(false);
  let { id } = useParams();
  id = isNaN(id) ? id === 'undefined' ? localId : id.substring(3) : id;
  let [curId, setCurId] = useState(id);
  //get id from url


  useEffect(()=> {
    console.log('call');
    setCurId(id);
    if (id === localId) {
      setAccountOwner(true);
    }
    if (id !== curId) {
      setDataLoading(true);
    }

    if (dataLoading || !accountOwner ) {

      getData(id, `/account/my-profile`).then(data => {
        setProfile(data[0]);
        setDataLoading(false);
      }).catch(err => {
        console.log('err ', err);
        setDataLoading(false);
        throw (err);
      });
    }
  }

  , [id, accountOwner] );




  return ( <ThemeProvider breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}>

    <Container fluid={true} style={{'paddingTop': '10px'}}>

      <Row >
        <Col xs={12} md={5} lg={4} style={{margin: '2%'}}>
          <ProfileCard user= {profile} accountOwner={accountOwner}></ProfileCard>
          {/* <Image thumbnail = {true} width = {600}roundedCircle = {true} fluid = {true} src = {profile.userPhoto} /> */}
        </Col >
        <Col xs={12} sm={5} md={4} lg={4} style={{margin: '2%'}}>
          <ProfileTabs user ={profile} accountOwner={accountOwner}></ProfileTabs>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  </ThemeProvider>
  );
}
