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

  const modelInfo = props.details.model ? <>{props.details.model}</> : <>Unavailable</>;
  const brandInfo = props.details.brand ? <>{props.details.brand}</> : <>Unavailable</>;
  const descriptionInfo = props.details.itemdescription ? <>{props.details.itemdescription}</> : <>Unavailable</>;

  return (
    <Container>
      <div className='inside'>
        <h4>Brand</h4>
        {brandInfo}
      </div>
      <div className='inside'>
        <h4>Model</h4>
        {modelInfo}
      </div>
      <div className='description inside'>
        <h4>Description</h4>
        {descriptionInfo}
      </div>
    </Container>
  );

};

export default ItemDetails;

