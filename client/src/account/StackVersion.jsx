import ListGroup from 'react-bootstrap/ListGroup';
import React, {useState, useEffect} from 'react';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import { BsSortDownAlt, BsSortUpAlt } from 'react-icons/bs';
import {Link } from 'react-router-dom';
import moment from 'moment';
import RefundButton from '../checkout/RefundButton.jsx';
import Image from 'react-bootstrap/Image';
import Stack from 'react-bootstrap/Stack';
import '../App.css';
import './accountStyles.css';
import noImagePhoto from '../itemView/samplePhotos/unavailable-image.jpeg';

export default function TableStack (props) {
  props.column;
  const [state, setState] = useState(false);

  //create dynamic state for all columns added
  const textStates = {};
  const setTextStates = {};
  props.columns.map((col) => {
    if (col.sort) {
      let [textState, setTextState] = useState(false);
      textStates[col.dataField] = textState;
      setTextStates[col.dataField] = setTextState;
    }
  });

  // create state that keeps track of data and the currently sorted col
  const [clickedColumn, setClickedColumn] = useState(['', false]);
  const [values, setValues] = useState(props.values);

  var tRows = [];
  var mapRows = ()=> {

    //CREATE THE SORTING OPTIONS AT THE TOP
    tRows.push(
      <Stack direction="horizontal" gap={4}>
        <h4> Sort By: </h4>
        <h5 onClick ={()=> {
          setClickedColumn(['title', textStates['title']]);
          setTextStates['title'](!textStates['title']);
        }}> Item Name:{textStates['title'] ? <BsSortUpAlt/> : <BsSortDownAlt/> } </h5>
        <h5 onClick ={()=> {
          setClickedColumn(['owner', textStates['owner']]);
          setTextStates['owner'](!textStates['owner']);
        }}> Owner:{textStates['owner'] ? <BsSortUpAlt/> : <BsSortDownAlt/> } </h5>
        <h5 onClick ={()=> {
          setClickedColumn(['pickupdate', textStates['pickupdate']]);
          setTextStates['pickupdate'](!textStates['pickupdate']);
        }}> Pickup:{textStates['pickupdate'] ? <BsSortUpAlt/> : <BsSortDownAlt/> } </h5>
        <h5 onClick ={()=> {
          setClickedColumn(['returndate', textStates['returndate']]);
          setTextStates['returndate'](!textStates['returndate']);
        }}> Return:{textStates['returndate'] ? <BsSortUpAlt/> : <BsSortDownAlt/> } </h5>
      </Stack>);


    // create the table rows based off of the input values

    values.map(t => {

      tRows.push(
        <Stack className='tableRow' direction="horizontal" >
          <Stack className='textCol' gap={1}>
            <div> <h4> <Link to={`../item/id=${t['item_id']}`}>{t['title']} </Link>  ${t['rate']}/day  </h4> </div>
            <div> <h5><Link to={`../profile/id=${t['owner_id']}`}>{t['owner']} </Link> </h5></div>
            <div> {moment(t['pickupdate']).format('MMMM Do YYYY')} -  {moment(t['returndate']).format('MMMM Do YYYY')} </div>
            { props.refundOption ? t['refunded'] || (moment(t.pickupdate).isBefore(moment(new Date()))) ?
              '' :
              <div className = 'cancelButton'> <RefundButton owner_id = {t['owner_id']} transaction_id={t['transaction_id']}/> </div> : ''
            }
          </Stack>

          <div className='photoCol'><Image className = 'itemPhoto' src={t.photos[0] ? t.photos[0] : noImagePhoto} thumbnail width={'210px'} height={'auto'} /></div>
        </Stack>

      );
    });

    return tRows;
  };

  var tableRows = mapRows();

  // this function sorts the various columns
  // eslint-disable-next-line func-style
  function handleSort() {
    const sortedList = [...values].sort((a, b) => {
      // console.log('clickedC in sort', clickedColumn);
      if (clickedColumn[1] === false) {
        return a[clickedColumn[0]] < b[clickedColumn[0]] ? -1 : a[clickedColumn[0]] > b[clickedColumn[0]] ? 1 : 0;
      } else {
        return a[clickedColumn[0]] > b[clickedColumn[0]] ? -1 : a[clickedColumn[0]] < b[clickedColumn[0]] ? 1 : 0;
      }
    });
    setValues(sortedList);
  }

  var changeState = (name, value) => {
    setState(prev =>({
      ...prev,
      [name]: value
    }));
  };

  // everytime the clickedColumn is changed it sorts the table again
  useEffect(()=> {
    handleSort();
  }, [clickedColumn]);

  return (
    <Container>
      <Stack className='tbsContainer' >{tRows}</Stack>
    </Container>
  );

}




