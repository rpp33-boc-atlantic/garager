import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: grid;
  // background: white;
  padding: 1em;
  // align-self: start;
  grid-template-columns: 1fr 1fr;
  // text-indent: .8em
  grid-auto-rows: minmax(60px, auto);
  grid-template-rows: 5em 1fr;

  h4 {
    margin-top: .5em;
    margin-bottom: .2em;
  }

  .description {
    grid-row: 2;
    grid-column: 1 / 4;
  }
  .inside {
    // background: white;
  }

`;

const ItemDetails = (props) => {

  return (
    <Container>
      <div className='inside'>
        <h4>Model</h4>
        {props.details.model}
      </div>
      <div className='inside'>
        <h4>Brand</h4>
        {props.details.brand}
      </div>
      <div className='description inside'>
        <h4>Description</h4>
        {props.details.description}
      </div>
    </Container>
  );

};

export default ItemDetails;