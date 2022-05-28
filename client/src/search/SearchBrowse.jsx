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
      query: ''
    };
  }

  render() {
    return (
      <div id="search-browse-view">
        <Search categories={this.state.categories}/>
        <Browse rentals={this.state.allRentals}/>
      </div>
    );
  }
}

export default SearchBrowse;