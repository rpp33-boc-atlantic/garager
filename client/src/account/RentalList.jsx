import ListGroup from 'react-bootstrap/ListGroup';
import {Link} from 'react-router-dom';

import React, {useState} from 'react';
var transactions = require('../data/dataFunctions/transactions.json');
var items = require('../data/dataFunctions/items.json');
import moment from 'moment';
import Table from 'react-bootstrap/Table';
console.log(transactions);
console.log(items);

var mapper = () => {
  mapped = [];
  transactions.map((t, i) => {

    mapped.push(<tr>
      <td><Link key={i} to='../item'>{items[Math.floor(Math.random( ) * 40)].name}</Link></td>
      <td>{t.ownerName}</td>
      <td>{moment(t.startDate).format('MMMM Do YYYY, h:mm:ss a')}</td>
      <td> {moment(t.dueDate).format('MMMM Do YYYY, h:mm:ss a') }</td>
    </tr>);

  });
  return mapped;
};

var mapped = mapper();

export default function RentalList () {



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
        {mapped}

      </tbody>
    </Table>


  );

}



{ /* <div>


console.log(t);

<ul>

  <li>

    <ListGroup horizontal>
      <ListGroup.Item>{items[3].name}</ListGroup.Item>
      <ListGroup.Item>{transactions[4].ownerName}</ListGroup.Item>
      <ListGroup.Item>{transactions[4].startDate}</ListGroup.Item>
      <ListGroup.Item>{transactions[4].dueDate}</ListGroup.Item>

    </ListGroup>;
  </li>
</ul>;
})

}
</div> */ }