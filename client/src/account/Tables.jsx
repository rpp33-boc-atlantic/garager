import ListGroup from 'react-bootstrap/ListGroup';
import React, {useState, useEffect} from 'react';
import Table from 'react-bootstrap/Table';
import { BsSortDownAlt, BsSortUpAlt } from 'react-icons/bs';
import {Link } from 'react-router-dom';
import moment from 'moment';


export default function Tables (props) {
  props.column;
  const [state, setState] = useState(false);
  // const values = props.values;
  const textStates = {};
  const setTextStates = {};
  // for (var name of names) {
  //   let [textState, setTextState] = useState('');
  //   textStates[name] = textState;
  //   setTextStates[name] = setTextState;
  // }
  props.columns.map((col) => {
    let [textState, setTextState] = useState(false);
    textStates[col] = textState;
    setTextStates[col] = setTextState;
  });
  // const [checkoutSorted, setcheckoutSorted] = useState(false);
  const [clickedColumn, setClickedColumn] = useState(['startDate', false]);
  // const [returnSorted, setReturnSorted] = useState(false);
  const [values, setValues] = useState(props.values);
  // const [ownerName, setOwnerName] = useState(false);
  // const [itemName, setItemName] = useState(false);

  console.log('STATE', state);
  console.log('props', values);
  var mapRows = ()=> {
    var tRows = [];
    var p = 0;
    var c = 0;
    values.map(t => {

      tRows.push(
        <tr key={p++}>
          {props.columns.map((col) => {
          // <td><Link to='../item'>{col.dataField}</Link></td>
            // return col.link ? console.log('col', col.link) : console.log('col.notHere');
            // console.log('photos:', t.photos);
            // console.l/og('col.dataField:', t[col.dataField]);
            return col.link ? <td key={c++}> <Link to={col.link}>{t[col.dataField]}</Link> </td> : col.dataField === 'photos' && t[col.dataField].length > 0 ? <td key={c++}> <img src={t[col.dataField][0]} width="75" height="100%" /> </td> : <td key={c++}>{t[col.dataField]}</td>;

            // return   {col.link ? <td> <Link to={col.link}>{t.name}</Link> </td> :

            //   }
            // }
            // return <td> <Link to={col.link}>{t.name}</Link> </td>;


          })}
          <td><button> { moment(t.availableTo).isBefore(moment(new Date())) ? <p>available</p> : <p>unavailable</p>}</button></td>
        </tr>);
    });



    return tRows;
  };

  var tableRows = mapRows();

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

  useEffect(()=> {
    console.log('clickedC', clickedColumn);
    // setValues(props.values);




  }, []);

  // console.log('props', props.rentals);
  return (
    <Table striped bordered hover>
      <thead>


        <tr>
          {props.columns.map((col, i)=> {

            return col.sort ? <th key = {i} onClick ={()=> {
              // setState(col.text, !state);
              setClickedColumn([col.dataField, textStates[col]]);
              console.log('clickedCol = ', clickedColumn);
              setTextStates[col](!textStates[col]);
              handleSort();
            }}> {col.text}{textStates[col] ? <BsSortUpAlt/> : <BsSortDownAlt/> }  </th> :
              <th key = {i}>{col.text}</th>;
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


