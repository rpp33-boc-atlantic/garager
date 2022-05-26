import React, { useState } from 'react';
import styled from 'styled-components';
import ImageGallery from './ImageGallery.jsx';
import ItemDetails from './ItemDetails.jsx';
import OwnerAndAvailability from './OwnerAndAvailability.jsx';
import RentForm from './RentForm.jsx';
import sampleItemData from './sampleItemData.js';


const Container = styled.div`
  display: grid;
  background: #eee;
  padding: 1em;
  grid-template-columns: 3fr 2fr;
  grid-gap: 1em;
  grid-auto-rows: minmax(150px, auto);
  justify-items: stretch;
  // align-items: center;
`;

class Item extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {

  }

  render () {
    var fakeProps = sampleItemData.option1;
    // console.log('this is fakeProps', fakeProps);
    return (
      <div>
        <Container>
          <ImageGallery className='gallery' images={fakeProps.images}/>
          <OwnerAndAvailability className='owner' name={fakeProps.name} owner={fakeProps.owner} availability={fakeProps.availability}/>
          <ItemDetails className='details' details={fakeProps.details}/>
          <RentForm className='form' formInfo={fakeProps.formInfo} availability={fakeProps.availability}/>
        </Container>
      </div>
    );
  }
}

export default Item;