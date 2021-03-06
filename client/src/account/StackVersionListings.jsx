import ListGroup from 'react-bootstrap/ListGroup';
import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import { BsSortDownAlt, BsSortUpAlt } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import moment from 'moment';
import RefundButton from '../checkout/RefundButton.jsx';
import Image from 'react-bootstrap/Image';
import Stack from 'react-bootstrap/Stack';
import '../App.css';
import './accountStyles.css';

import noImagePhoto from '../itemView/samplePhotos/unavailable-image.jpeg';

export default function StackVersionListings (props) {

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
    var key = 0;
    //CREATE THE SORTING OPTIONS AT THE TOP
    tRows.push(
      <Stack className = 'options' key={key++} direction="horizontal" gap={3}>
        <h3> Sort By: </h3>
        <h3 onClick ={()=> {
          setClickedColumn(['title', textStates['title']]);
          setTextStates['title'](!textStates['title']);
        }}> Item Name:{textStates['title'] ? <BsSortUpAlt/> : <BsSortDownAlt/> } </h3>

      </Stack>);


    // create the table rows based off of the input values

    values.map(t => {

      tRows.push(
        <Stack key={key++} className='tableRow' direction="horizontal" >
          <Stack className='textCol' gap={1}>
            <h1 className='textRow'> <Link to={`../item/id=${t['item_id']}`}>{t['title']} </Link>  ${t['price']}/day  </h1>
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




