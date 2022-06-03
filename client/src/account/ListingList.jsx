import ListGroup from 'react-bootstrap/ListGroup';
import React from 'react';
import Table from 'react-bootstrap/Table';

// var transactions = require('../data/dataFunctions/transactions.json');

const columns = [{
//   dataField: 'Numner of times rented',
//   text: 'Number of times rented',
//   sort: true
// }, {
  dataField: 'item_id',
  text: 'Product Name',
  sort: true
}, {
  dataField: 'price',
  text: 'Current Price per Day',
  sort: true
}, {
  dataField: '',
  text: 'Current Price per Day',
  sort: true
}];
  //dataField: 'Current Status',
  // text: 'Product Price'
// }

// export default () =>
//   <BootstrapTable keyField='id' data={ products } columns={ columns } />

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
      {/* <BootstrapTable keyField='id' data={ products } columns={ columns } /> */}
    </React.Fragment>
  );

}


