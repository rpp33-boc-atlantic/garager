import ListGroup from 'react-bootstrap/ListGroup';
import React, {useState} from 'react';
import Table from 'react-bootstrap/Table';


export default function RentalList (props) {
  console.log('props', props);
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Item Name</th>
          <th>Owner Name</th>
          <th>Checked Out</th>
          <th>Due</th>
        </tr>
      </thead>
      <tbody>
        {props.rentals}
      </tbody>
    </Table>
  );

}


