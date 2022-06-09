
import React, {useState, useEffect} from 'react';
import RentalTabs from './RentalTabs.jsx';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import ThemeProvider from 'react-bootstrap/ThemeProvider';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import ListGroup from 'react-bootstrap/ListGroup';
import {FcMoneyTransfer} from 'react-icons/Fc';


export default function EarningsCard (props) {
  const [dataLoading, setDataLoading] = useState(true);
  const [values, setValues] = useState([]);


  var duration = props.duration ? props.duration.toLowerCase() : '';
  var values1 = props.values[0] ? props.values[0] : {};
  console.log('VALS YALLs', values1);
  console.log(values1[`${duration}_transactions`]);



  return (

    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title > {props.duration} Report</Card.Title>
        {duration === 'total' ? <Card.Text>Your total earnings <FcMoneyTransfer/> </Card.Text> :
          <Card.Text> Your earnings this {duration.slice(0, -2)} <FcMoneyTransfer/> </Card.Text> }

      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroupItem> ${props.values[0] ? props.values[0][duration] : ''}</ListGroupItem>
        <ListGroupItem>from {values1[`${duration}_transactions`]} transactions </ListGroupItem>
        <ListGroupItem>from {values1[`${duration}_items`]} items </ListGroupItem>
      </ListGroup>
      <Card.Body>
      </Card.Body>
    </Card>


  );
}

