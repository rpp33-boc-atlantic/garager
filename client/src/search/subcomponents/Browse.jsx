import React, { useState, useEffect } from 'react';

import RentalListings from './RentalListings.jsx';

const Browse = (props) => {

  const [rentals, setRentals] = useState(props.rentals);

  useEffect(() => {
    setRentals(props.rentals);
  });

  const handleBrowseSort = async (event) => {
    event.preventDefault();
    let sortMethod = event.target.value;

    if (sortMethod === 'price-low-high') {
      sortPriceLowToHigh(rentals);
    } else if (sortMethod === 'price-high-low') {
      sortPriceHighToLow(rentals);
    } else if (sortMethod === 'alphabet-a-z') {
      sortAlphabetAToZ(rentals);
    } else if (sortMethod === 'alphabet-z-a') {
      sortAlphabetZToA(rentals);
    } else if (sortMethod === 'popular-high-low') {
      sortPopularLowToHigh(rentals);
    } else if (sortMethod === 'popular-low-high') {
      sortPopularHighToLow(rentals);
    }
  };

  const sortPriceLowToHigh = (rentals) => {
    setRentals([...rentals.sort((a, b) => {
      if (a.details.price < b.details.price) {
        return -1;
      } else if (a.details.price > b.details.price) {
        return 1;
      } else {
        return 0;
      }
    })]);
  };

  const sortPriceHighToLow = (rentals) => {
    setRentals([...rentals.sort((a, b) => {
      if (a.details.price < b.details.price) {
        return 1;
      } else if (a.details.price > b.details.price) {
        return -1;
      } else {
        return 0;
      }
    })]);
  };

  const sortAlphabetAToZ = (rentals) => {
    setRentals([...rentals.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      } else if (a.name > b.name) {
        return 1;
      } else {
        return 0;
      }
    })]);
  };

  const sortAlphabetZToA = (rentals) => {
    setRentals([...rentals.sort((a, b) => {
      if (a.name < b.name) {
        return 1;
      } else if (a.name > b.name) {
        return -1;
      } else {
        return 0;
      }
    })]);
  };

  const sortPopularLowToHigh = (rentals) => {
    setRentals([...rentals.sort((a, b) => {
      if (a.details.transactions < b.details.transactions) {
        return -1;
      } else if (a.details.transactions > b.details.transactions) {
        return 1;
      } else {
        return 0;
      }
    })]);
  };

  const sortPopularHighToLow = (rentals) => {
    setRentals([...rentals.sort((a, b) => {
      if (a.details.transactions < b.details.transactions) {
        return 1;
      } else if (a.details.transactions > b.details.transactions) {
        return -1;
      } else {
        return 0;
      }
    })]);
  };

  return (
    <div id="browse-column">
      <div id="browse-header">
        <span className="column-title">RENTALS NEAR YOU</span>
        <div id="browse-sort">
          <span>Sort items by </span>
          <select name="browse-sort-options" id="sort-dropdown" onChange={handleBrowseSort}>
            <option default hidden>Select Method</option>
            <option value="price-low-high">Price: Low to High</option>
            <option value="price-high-low">Price: High to Low</option>
            <option value="alphabet-a-z">Alphabet: A to Z</option>
            <option value="alphabet-z-a">Alphabet: Z to A</option>
            <option value="popular-low-high">Popular: Low to High</option>
            <option value="popular-high-low">Popular: High to Low</option>
          </select>
        </div>
      </div>
      <RentalListings
        rentals={rentals}
        query={props.query}
      />
    </div>
  );
};

export default Browse;