import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';

const Container = styled.div`
  display: grid;
  // background: white;
  // padding: 2em;
  padding-top: .5px;
  padding-right: 2em;
  padding-bottom: 4em;
  padding-left: 2em;

  // justify-self: end;
  grid-row: 1 / 3;
  grid-template-columns: 1fr;
  justify-content: start;
  max-height: 50px

  h2 {
    margin-top: .2em;
  }
  h3 {
    margin-top: .2em;
  }
  h4 {
    margin-top: .2em;
  }
`;

const OwnerInfo = (props) => {
  // console.log('props here', props)
  return (
    <Container>
      <h2>{props.name}</h2>
      <h4>{props.owner.address}</h4>
      <h4>Owner: {props.owner.name}</h4>
      <h4>Member Since: {props.owner.dateJoined}</h4>
      <Link to="/Messages" state={{ itemID: 12345 }}>
        <button>Message</button>
      </Link>
    </Container>
  );

};

export default OwnerInfo;
