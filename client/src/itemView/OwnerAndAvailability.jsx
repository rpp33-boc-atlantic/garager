import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';

const Container = styled.div`
  display: grid;
  background: white;
  padding: 1em;
  // justify-self: end;
  grid-row: 1 / 3;
`;

const OwnerAndAvailability = (props) => {
  // console.log('props here', props)
  return (
    <Container>

      <h2>{props.name}</h2>
      <h3>This item is: {props.availability ? 'Available' : 'Not Available'}</h3>
      <h3>Item Owner: {props.owner.name}</h3>
      <h4>{props.owner.description}</h4>
      <Link to="/FAQ">
        <button>Message</button>
      </Link>
    </Container>
  )

};

export default OwnerAndAvailability;
