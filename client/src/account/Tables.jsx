import ListGroup from 'react-bootstrap/ListGroup';
import React, {useState, useEffect} from 'react';
import Table from 'react-bootstrap/Table';
import { BsSortDownAlt, BsSortUpAlt } from 'react-icons/bs';
import {Link } from 'react-router-dom';
import moment from 'moment';


export default function Tables (props) {
  props.column;
  const [state, setState] = useState(false);

  //create dynamic state for all columns added
  const textStates = {};
  const setTextStates = {};
  props.columns.map((col) => {
    let [textState, setTextState] = useState(false);
    textStates[col] = textState;
    setTextStates[col] = setTextState;
  });
  // create state that keeps track of data and the currently sorted col
  const [clickedColumn, setClickedColumn] = useState(['', false]);
  const [values, setValues] = useState(props.values);

  //
  var mapRows = ()=> {
    var tRows = [];
    var p = 0;
    var c = 0;
    // create the table rows based off of the input values
    values.map(t => {

      tRows.push(
        <tr key={p++}>
          { // create the columns based off of the column object
            props.columns.map((col) => {

              { // this wasn't supposed to be so complicated, but it will dynamically add a link, image or datefield
                return col.link ? <td key={c++}> <Link to={col.link}>{t[col.dataField]}</Link> </td> : col.dataField === 'photos' && t[col.dataField].length > 0 ? <td key={c++}> <img src={t[col.dataField][0]} width="75" height="100%" /> </td> : t[col.dataField].length > 5 && moment(t[col.dataField], 'YYYY-MM-DD T HH:mm:ss').isValid() ? <td> {moment(t[col.dataField]).format('MMMM Do YYYY, HH:mm:ss a')}</td> : <td key={c++}>{t[col.dataField]}</td>;
              }
            })
          }
          {/* // not sure about this button yet */}
          <td><button> { moment(t.availableTo).isBefore(moment(new Date())) ? <p>available</p> : <p>unavailable</p>}</button></td>
        </tr>);
    });

    return tRows;
  };

  var tableRows = mapRows();

  // this function sorts the various columns
  var handleSort = () => {

    const sortedList = [...values].sort((a, b) => {
      if (clickedColumn[1] === false) {
        return a[clickedColumn[0]] < b[clickedColumn[0]] ? -1 : a[clickedColumn[0]] > b[clickedColumn[0]] ? 1 : 0;
      } else {
        return a[clickedColumn[0]] > b[clickedColumn[0]] ? -1 : a[clickedColumn[0]] < b[clickedColumn[0]] ? 1 : 0;
      }
    });
    setValues(sortedList);
  };

  var changeState = (name, value) => {
    setState(prev =>({
      ...prev,
      [name]: value
    }));
  };

  // not sure I need this
  useEffect(()=> {
    console.log('clickedC', clickedColumn);
    // setValues(props.values);

  }, []);

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          {// this code dynamically creates the table headers
            props.columns.map((col, i)=> {
              return col.sort ? <th key = {i} onClick ={()=> {
                setClickedColumn([col.dataField, textStates[col]]);
                console.log('clickedCol = ', clickedColumn);
                setTextStates[col](!textStates[col]);
                handleSort();
              }}> {col.text}{textStates[col] ? <BsSortUpAlt/> : <BsSortDownAlt/> }  </th> :
                <th key = {i}>{col.text}</th>;
            })}
        </tr>
      </thead>
      <tbody>
        {/* add the table rows to the table */}
        {tableRows}
      </tbody>
    </Table>
  );

}


