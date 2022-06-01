import ListGroup from 'react-bootstrap/ListGroup';
import React from 'react';
import Table from 'react-bootstrap/Table';


export default function ListingList (props) {
  console.log('props', props);
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Item Name</th>
          <th>Current Price Per Day</th>
          <th>Current Minimum Price</th>
          <th>Checked Out</th>
          <th>Due</th>
        </tr>
      </thead>
      <tbody>
        {props.listings}
      </tbody>
    </Table>
  );

}


