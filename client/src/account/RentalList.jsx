import ListGroup from 'react-bootstrap/ListGroup';
import React, {useState, useEffect} from 'react';
import Table from 'react-bootstrap/Table';
import { BsSortDownAlt, BsSortUpAlt } from 'react-icons/bs';
import {Link } from 'react-router-dom';
import moment from 'moment';


export default function RentalList (props) {
  const [checkoutSorted, setcheckoutSorted] = useState(false);
  const [clickedColumn, setClickedColumn] = useState(['startDate', false]);
  const [returnSorted, setReturnSorted] = useState(false);
  const [transactions, setTransactions] = useState(props.rentals);
  const [ownerName, setOwnerName] = useState(false);
  const [itemName, setItemName] = useState(false);



  var mapRows = ()=> {
    var tRows = [];
    var p = 0;

    transactions.map(t => {
      tRows.push(<tr key={p++}>
        <td><Link to='../item'>{t.name}</Link></td>
        <td>{t.ownerName}</td>
        <td>{moment(t.startDate).format('MMMM Do YYYY, h:mm:ss a')}</td>
        <td> {moment(t.dueDate).format('MMMM Do YYYY, h:mm:ss a') }</td>
      </tr>);
    });
    return tRows;
  };

  var tableRows = mapRows();

  var handleSort = () => {

    const sortedList = [...transactions].sort((a, b) => {
      if (clickedColumn[1] === false) {
        return a[clickedColumn[0]] < b[clickedColumn[0]] ? -1 : a[clickedColumn[0]] > b[clickedColumn[0]] ? 1 : 0;
      } else {
        return a[clickedColumn[0]] > b[clickedColumn[0]] ? -1 : a[clickedColumn[0]] < b[clickedColumn[0]] ? 1 : 0;
      }
    });
    setTransactions(sortedList);
  };

  useEffect(()=> {
    console.log('clickedC', clickedColumn);
    setTransactions(props.rentals);
  }, []);

  // console.log('props', props.rentals);
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th onClick ={()=> {
            setOwnerName(!ownerName);
            setClickedColumn(['name', ownerName]);
            handleSort();
          }}> Item {ownerName ? <BsSortUpAlt/> : <BsSortDownAlt/> }  </th>

          <th onClick ={()=> {
            setOwnerName(!ownerName);
            setClickedColumn(['ownerName', ownerName]);
            handleSort();
          }}> Owner Name {ownerName ? <BsSortUpAlt/> : <BsSortDownAlt/> }  </th>

          <th onClick ={()=> {
            setcheckoutSorted(!checkoutSorted);
            setClickedColumn(['startDate', checkoutSorted]);
            handleSort();
          }}> Checked Out    {checkoutSorted ? <BsSortUpAlt/> : <BsSortDownAlt/>} </th>

          <th onClick ={()=> {
            setReturnSorted(!returnSorted);
            setClickedColumn(['dueDate', returnSorted]);
            handleSort();
          }}>Due  {returnSorted ? <BsSortUpAlt/> : <BsSortDownAlt/>}</th>


        </tr>
      </thead>
      <tbody>
        {/* {props.rentals} */}
        {tableRows}
      </tbody>
    </Table>
  );

}


