import React from 'react';

const RentalListings = (props) => {
  return (
    <div id="rental-listings">
      {props.rentals.map((rental) =>
        <div className="rental-listing" key={rental.id}>
          <img src={rental.details.image}></img>
          <div className="listing-text">
            <div className="listing-header">
              <span className="rental-title">{rental.details.category} | {rental.name}</span>
              <span className="rental-price">{rental.details.price}/day</span>
            </div>
            <p>{rental.details.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default RentalListings;