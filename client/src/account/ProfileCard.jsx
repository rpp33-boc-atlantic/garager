
import React, { useState } from 'react';
import RentalTabs from './RentalTabs.jsx';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import ThemeProvider from 'react-bootstrap/ThemeProvider';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import ListGroup from 'react-bootstrap/ListGroup';
import { FiEdit3 } from 'react-icons/fi';
import moment from 'moment';

export default function ProfileCard (props) {

  const [profileEdit, setProfileEdit] = useState(false);
  const [values, setValues] = useState(props.values);

  return (

    <Card style={{ width: '19rem' }}>
      <Card.Img variant="top" src={props.user.userphoto} />
      <Card.Body>
        {/* onMouseEnter={() => this.someHandler */}
        {props.accountOwner ? <Card.Title onClick={(() => { setProfileEdit(!profileEdit); })}>   {props.user.firstname + ' ' + props.user.lastname} <FiEdit3/> </Card.Title> : <Card.Title>   {props.user.firstname + ' ' + props.user.lastname} </Card.Title>}

        {props.accountOwner ? <Card.Text onClick={(() => { setProfileEdit(!profileEdit); })}>   {props.user.address} <FiEdit3/> </Card.Text> : <Card.Text>   {props.user.address} </Card.Text>}
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroupItem>{props.user.phone}</ListGroupItem>
        <ListGroupItem>{props.user.email}</ListGroupItem>
      </ListGroup>
      <Card.Body>
        <ListGroupItem>Date Joined: { moment(props.user.datejoined).format('MMMM Do YYYY')}</ListGroupItem>
        {/* <Card.Link href="#">Card Link</Card.Link>
        <Card.Link href="#">Another Link</Card.Link> */}
      </Card.Body>
    </Card>


  );
}

