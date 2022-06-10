import React from 'react';
import { Link } from 'react-router-dom';
import categories from '../../data/categories.js';


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
          <Link to={`../Item/id=${rental.id}`} key={rental.id} className="go-to-item-listing">
            <div className="rental-listing">
              {rental.details.image ?
                <img src={rental.details.image[0]}></img> :
                <img src={categories[rental.details.category].image}></img>
              }
              <div className="listing-text">
                <div className="listing-header">
                  <div className="listing-title">
                    <span className="rental-category">{rental.details.category}</span>
                    <span>&nbsp;|&nbsp;</span>
                    <span data-testid="rental-title">
                      {this.props.query ?
                        this.highlightKeywordSearch(this.props.query, rental.name) :
                        rental.name
                      }
                    </span>
                  </div>
                  <span className="rental-price">${rental.details.price}.00/day</span>
                </div>
                <p className="rental-description">{this.props.query ?
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