import React, { useState } from 'react';
import styled from 'styled-components';
import CarouselContainer from './CarouselContainer.jsx';
import ItemDetails from './ItemDetails.jsx';
import OwnerInfo from './OwnerInfo.jsx';
import RentForm from './RentForm.jsx';
import sampleItemData from './sampleItemData.js';
import ladder1 from './samplePhotos/ladder1.jpeg';
import ladder2 from './samplePhotos/ladder2.jpeg';
import ladder3 from './samplePhotos/ladder3.jpeg';


const Container = styled.div`
  display: grid;
  // background: #eee;
  background: white:
  padding: 1em;
  grid-template-columns: 3fr 2fr;
  grid-gap: 1em;
  grid-auto-rows: minmax(2em, auto);
  justify-items: stretch;
  // align-items: center;


  // grid-template-rows:40px 40px;
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
    var dummyImages = [ladder1, ladder2, ladder3];
    // console.log('this is fakeProps', fakeProps);
    return (
      <div>
        <Container>
          <CarouselContainer className='gallery' images={fakeProps.images}/>
          <OwnerInfo className='owner' name={fakeProps.name} owner={fakeProps.owner} />
          <ItemDetails className='details' details={fakeProps.details}/>
          <RentForm className='form' formInfo={fakeProps.formInfo} owner={fakeProps.owner} name={fakeProps.name} itemID={fakeProps.itemID}/>
        </Container>
      </div>
    );
  }
}

export default Item;