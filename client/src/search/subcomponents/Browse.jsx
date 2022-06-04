import React from 'react';

import RentalListings from './RentalListings.jsx';

const Browse = (props) => {

  const [sortBy, setSortBy] = useState('');

  const handleBrowseSearch = (event) => {
    event.preventDefault();
  };

  return (
    <div id="browse-column">
      <span>RENTALS NEAR YOU</span>
      <div id="browse-sort">
        <span>Sort items by </span>
        <select name="browse-sort-options" id="sort-dropdown" onChange={handleBrowseSort}>
          <option value="price | low > high"></option>
          <option value="price | high > low"></option>
        </select>
      </div>
      <RentalListings
        rentals={props.rentals}
        query={props.query}
      />
    </div>
  );
};

export default Browse;