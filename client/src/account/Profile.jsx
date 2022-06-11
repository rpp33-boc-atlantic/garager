
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



  const localId = localStorage.getItem('currentId') ? localStorage.getItem('currentId') : '';
  let [accountOwner, setAccountOwner] = useState(false);
  // console.log('LOCAL ID --FAST RESPONSE TIME', localId);


  //get id from url
  let { id } = useParams();
  id = isNaN(id) ? id.substring(3) : id;

  useEffect(()=> {

    if (dataLoading ) {

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

  , [] );
  useEffect(()=> {
    if (id === localId) {
      setAccountOwner(true);
    }
  }

  , [ accountOwner] );



  return ( <ThemeProvider breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}>

    <Container fluid={true} style={{'paddingTop': '10px'}}>

      <Row >
        <Col></Col>
        <Col>
          <ProfileCard user= {profile} accountOwner={accountOwner}></ProfileCard>
          {/* {/* <Image thumbnail = {true} width = {600}roundedCircle = {true} fluid = {true} src = {user.userPhoto} /> */}
        </Col >
        <Col xs={8}>
          <ProfileTabs user ={profile} accountOwner={accountOwner}></ProfileTabs> (wider)
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



// UPDATE users
// SET userphoto = 'https://upload.wikimedia.org/wikipedia/en/d/dc/MichaelScott.png'
// // where user_id = 5;

// UPDATE users
// set userphoto = 'https://www.incimages.com/uploaded_files/image/1920x1080/tom-haverford-parks-recreation_39318.jpg'
// where user_id = 10 or user_id = 118;

// UPDATE users
// set email = 'wandavision@ucsf.edu '
// where user_id = 0;
// delete from users where user_id = 138

// delete
// from users
// where firstName like '%est%' OR lastName like '%est%';
// update users
// set email = lower(email)