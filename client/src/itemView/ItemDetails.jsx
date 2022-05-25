import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: grid;
  background: white;
  padding: 1em;
  // align-self: start;
  grid-template-columns: 1fr 1fr;
  // text-indent: .8em
  grid-auto-rows: minmax(60px, auto);

  h4 {
    margin-top: .5em;
    margin-bottom: .4em;
  }

  .description {
    grid-row: 2;
    grid-column: 1 / 4;
  }
`;

const ItemDetails = (props) => {

  return (
    <Container>
      <div>
        <h4>Model</h4>
        {props.details.model}
      </div>
      <div>
        <h4>Brand</h4>
        {props.details.brand}
      </div>
      <div className='description'>
        <h4>Description</h4>
        {props.details.description}
      </div>
    </Container>
  )

};

export default ItemDetails;