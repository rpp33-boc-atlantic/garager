import React from 'react';

class RentalListings extends React.Component {
  constructor (props) {
    super(props);
    this.highlightKeywordSearch = this.highlightKeywordSearch.bind(this);
  }

  highlightKeywordSearch = (query, rental) => {
    let regex = new RegExp(query, 'i');

    if (rental.match(regex)) {
      const splitRentalParts = rental.split(regex);
      return (
        <>
          {splitRentalParts[0]}
          <span className='search-query'>{query}</span>
          {splitRentalParts[1]}
        </>
      );
    } else {
      return rental;
    }
  };

  render() {
    return (
      <div id="rental-listings">
        {this.props.rentals.map((rental) =>
          <div className="rental-listing" key={rental.id}>
            <img src={rental.details.image}></img>
            <div className="listing-text">
              <div className="listing-header">
                <span className="rental-title">{rental.details.category} | {this.props.query ?
                  this.highlightKeywordSearch(this.props.query, rental.name) :
                  rental.name
                }</span>
                <span className="rental-price">{rental.details.price}/day</span>
              </div>
              <p>{this.props.query ?
                this.highlightKeywordSearch(this.props.query, rental.details.description) :
                rental.details.description
              }</p>
            </div>
          </div>
        )}
      </div>
    );
  }
};

export default RentalListings;