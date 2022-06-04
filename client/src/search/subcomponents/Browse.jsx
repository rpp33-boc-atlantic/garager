import React from 'react';

import RentalListings from './RentalListings.jsx';

const Browse = (props) => {
  return (
    <div id="browse-column">
      <span>RENTALS NEAR YOU</span>
      <RentalListings
        rentals={props.rentals}
        query={props.query}
      />
    </div>
  );
};

export default Browse;