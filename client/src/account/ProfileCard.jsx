
import React, {useState} from 'react';
import RentalTabs from './RentalTabs.jsx';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import ThemeProvider from 'react-bootstrap/ThemeProvider';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import ListGroup from 'react-bootstrap/ListGroup';
import {FiEdit3} from 'react-icons/Fi';

// import { BsSortDownAlt, BsSortUpAlt } from 'react-icons/bs';

// var transactions = require('../data/dataFunctions/transactions.json');
// var users = require('../data/dataFunctions/users.json');
// var user = users[0];


export default function ProfileCard (props) {
  const [profileEdit, setProfileEdit] = useState(false);
  const [values, setValues] = useState(props.values);
  // return <Button variant="contained">Hello World</Button>;
  // return <BasicTabs listings = {false} m='auto' earnings = {454} rentedItems = {3}/>;
  return (

  // <Image thumbnail = {true} width = {600}roundedCircle = {true} fluid = {true} src = {user.userPhoto} /> </Col>
  // props.user.firstName + ' ' + props.user.lastName
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={props.user.userphoto} />
      <Card.Body>
        {/* onMouseEnter={() => this.someHandler */}
        <Card.Title onClick={(() => { setProfileEdit(!profileEdit); })}>   {props.user.firstname + ' ' + props.user.lastname} <FiEdit3/> </Card.Title>
        <Card.Text>
      Some quick example text to build on the card title and make up the bulk of
      the card's content.
        </Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroupItem>{props.user.phone}</ListGroupItem>
        <ListGroupItem>{props.user.email}</ListGroupItem>
        <ListGroupItem>{props.user.dateJoined}</ListGroupItem>
      </ListGroup>
      <Card.Body>
        <Card.Link href="#">Card Link</Card.Link>
        <Card.Link href="#">Another Link</Card.Link>
      </Card.Body>
    </Card>


  );
}

