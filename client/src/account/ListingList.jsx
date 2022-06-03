import ListGroup from 'react-bootstrap/ListGroup';
import React from 'react';
import Table from 'react-bootstrap/Table';
/// I may eventually delete this because I made my Table component

export default function ListingList (props) {
  var items = props.items;
  const products = props.transactions;

  console.log('props', props);
  return (
    <React.Fragment>
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
    </React.Fragment>
  );

}


