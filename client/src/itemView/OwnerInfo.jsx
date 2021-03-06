import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import moment from 'moment';

const Container = styled.div`
  display: grid;
  padding-right: 2em;
  padding-bottom: 4em;
  padding-left: 2em;
  grid-row: 1 / 3;
  grid-template-columns: 1fr;
  justify-content: start;
  max-height: 28em;

  h2 {
    margin-top: .2em;
    max-height: 1.2em;
  }

  h4 {
    padding-top: .5em;
  }
`;

const OwnerInfo = (props) => {
  const getCityState = (address) => {

    if (address !== undefined) {
      const splitted = address.split(',');
      const city = splitted[1].substring(1);
      const state = splitted[2].substring(0, 3);
      return city + ',' + state;
    } else {
      return '';
    }
  };

  const shortenedLocation = getCityState(props.details.address);

  return (
    <Container>
      <h2>{props.details.title}</h2>
      <h4>{shortenedLocation}</h4>
      <h4>Owner: {props.details.firstname} {props.details.lastname}</h4>
      <h4>Member Since: {moment(props.details.datejoined).format('MMMM YYYY')}</h4>
      <Link to="/Messages" state={{ itemID: props.details.item_id, userEmail: props.user.email }}>
        <button className="btn btn-primary btn-sm">Message</button>
      </Link>
    </Container>
  );
};

export default OwnerInfo;
