import React, { useState } from 'react';
import styled from 'styled-components';
import ImageGallery from './ImageGallery.jsx';
import ItemDetails from './ItemDetails.jsx';
import OwnerAndAvailability from './OwnerAndAvailability.jsx';
import RentForm from './RentForm.jsx';


const Container = styled.div`
  display: grid;
  background: #eee;
  padding: 1em;
  grid-template-columns: 3fr 2fr;
  grid-gap: 1em;
  grid-auto-rows: minmax(100px, auto);
  justify-items: stretch;
  // align-items: center;

`;

class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render () {
    return (
      <div>
        <Container>
          <ImageGallery className='gallery'/>
          <OwnerAndAvailability className='owner'/>
          <ItemDetails className='details'/>
          <RentForm className='form'/>
        </Container>
      </div>
    );
  }
};

export default Item;