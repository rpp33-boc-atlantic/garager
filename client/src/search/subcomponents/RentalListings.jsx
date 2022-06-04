import React from 'react';
import { Link } from 'react-router-dom';

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
          <Link to={`Item/id=${rental.id}`} key={rental.id} className="go-to-item-listing">
            <div className="rental-listing">
              <img src={rental.details.image[0]}></img>
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
          </Link>
        )}
      </div>
    );
  }
}

export default RentalListings;