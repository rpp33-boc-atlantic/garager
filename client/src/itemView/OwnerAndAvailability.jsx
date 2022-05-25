import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: grid;
  background: white;
  padding: 1em;
  // justify-self: end;
  grid-row: 1 / 3;
`;

const OwnerAndAvailability = (props) => {

  return (
    <Container>
      Item name, availability, and owner
    </Container>
  )

};

export default OwnerAndAvailability;