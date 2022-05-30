import React from 'react';
import './searchBrowse.css';

import rentalListings from '../data/exampleRentals.js';
import categories from '../data/categories.js';

import Search from './subcomponents/Search.jsx';
import Browse from './subcomponents/Browse.jsx';

class SearchBrowse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allRentals: rentalListings,
      categories: categories,
      displayedRentals: rentalListings,
      query: '',
      radius: '',
      zipCode: ''
    };
    this.handleKeywordSearch = this.handleKeywordSearch.bind(this);
    this.filterByKeyword = this.filterByKeyword.bind(this);
    this.handleZipCodeSearch = this.handleZipCodeSearch.bind(this);
    this.handleRadiusSearch=this.handleRadiusSearch.bind(this);
    this.searchRentals = this.searchRentals.bind(this);
  }

  searchRentals = () => {
    this.setState({
      displayedRentals: this.state.allRentals
    }, () => {
      this.filterByKeyword();
    });
  };

  filterByKeyword = () => {
    let displayedRentals = [];
    let keyword = this.state.query;

    for (const rental of this.state.allRentals) {
      if ((rental.name.indexOf(keyword) !== -1) || (rental.details.description.indexOf(keyword) !== -1)) {
        displayedRentals.push(rental);
      }
    }
    this.setState({
      displayedRentals: displayedRentals
    });
  };

  handleKeywordSearch = (event) => {
    event.preventDefault();

    let keyword = event.target.value;

    if (keyword.length >= 3) {
      this.setState({
        query: keyword
      }, () => {
        this.searchRentals();
      });
    } else {
      this.setState({
        query: ''
      }, () => {
        this.searchRentals();
      });
    }
  };

  handleZipCodeSearch = (event) => {
    event.preventDefault();
    console.log('zip', event.target.value);
  };

  handleRadiusSearch = (event) => {
    event.preventDefault();

    let mileRadius = event.target.value;

    this.setState({
      radius: mileRadius
    }, () => {
      if (this.state.radius && this.state.zipCode) {
        this.searchRentals();
      }
    });
  };

  render() {
    return (
      <div id="search-browse-view">
        <Search
          categories={this.state.categories}
          keywordSearch={this.handleKeywordSearch}
          radiusSearch={this.handleRadiusSearch}
          zipCodeSearch={this.handleZipCodeSearch}
        />
        <Browse
          rentals={this.state.displayedRentals}
          query={this.state.query}
        />
      </div>
    );
  }
}

export default SearchBrowse;