import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: grid;
  background: white;
  padding: 1em;
  // align-self: start;
`;

const ItemDetails = (props) => {

  return (
    <Container>
      Item details: Model, brand, description
    </Container>
  )

};

export default ItemDetails;