import React, { useState } from 'react';
import styled from 'styled-components';
import ImageGallery from './ImageGallery.jsx';
import ItemDetails from './ItemDetails.jsx';
import OwnerAndAvailability from './OwnerAndAvailability.jsx';
import RentForm from './RentForm.jsx';


const Container = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;

  .itemName {
    font-size: 20px;
    padding: 10px 32px;
    justify-content: left;
  }
`;

class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render () {
    return (
      <Container>
        <h1 className='itemName'>Item!!</h1>
        <ImageGallery/>
        <ItemDetails/>
        <OwnerAndAvailability/>
        <RentForm/>
      </Container>
    );
  }
};

export default Item;