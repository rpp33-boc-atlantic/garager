import ListGroup from 'react-bootstrap/ListGroup';
import React, {useState, useEffect} from 'react';
import Table from 'react-bootstrap/Table';
import { BsSortDownAlt, BsSortUpAlt } from 'react-icons/bs';
import {Link } from 'react-router-dom';
import moment from 'moment';


export default function Tables (props) {
  const [state, setState] = useState(false);

  // props.columns.map((colu) => {
  //   const [colu, setState] = useState(false);
  // });
  const [checkoutSorted, setcheckoutSorted] = useState(false);
  const [clickedColumn, setClickedColumn] = useState(['startDate', false]);
  const [returnSorted, setReturnSorted] = useState(false);
  const [transactions, setTransactions] = useState(props.rentals);
  const [ownerName, setOwnerName] = useState(false);
  const [itemName, setItemName] = useState(false);

  console.log('STATE', state);

  var mapRows = ()=> {
    var tRows = [];
    var p = 0;

    transactions.map(t => {
      tRows.push(
        <tr key={p++}>
          {props.columns.map(col => {
          // <td><Link to='../item'>{col.dataField}</Link></td>
            return <td>{transactions[col.dataField]}</td>;

          })}
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
  var changeState = (name, value) => {
    setState(prev =>({
      ...prev,
      [name]: value
    }));
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
          {props.columns.map((col, i)=> {
            return <th key = {i} onClick ={()=> {
              setState(col.text, !state);
              setClickedColumn(['name', ]);

              handleSort();
            }}> {col.text}{ownerName ? <BsSortUpAlt/> : <BsSortDownAlt/> }  </th>;
          })}
          {/* <th onClick ={()=> {
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
          }}>Due  {returnSorted ? <BsSortUpAlt/> : <BsSortDownAlt/>}</th> */}


        </tr>
      </thead>
      <tbody>
        {tableRows}
      </tbody>
    </Table>
  );

}


