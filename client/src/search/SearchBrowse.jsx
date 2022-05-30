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
      allCategories: categories,
      allRentals: rentalListings,
      filteredRentals: rentalListings,
      selectedCategories: [],
      query: '',
      radius: '',
      zipCode: ''
    };
    this.handleKeywordSearch = this.handleKeywordSearch.bind(this);
    this.filterByKeyword = this.filterByKeyword.bind(this);
    this.handleZipCodeSearch = this.handleZipCodeSearch.bind(this);
    this.handleRadiusSearch = this.handleRadiusSearch.bind(this);
    this.handleCategorySearch = this.handleCategorySearch.bind(this);
    this.selectAllCategories = this.selectAllCategories.bind(this);
    this.unselectAllCategories = this.unselectAllCategories.bind(this);
    this.filterByCategory = this.filterByCategory.bind(this);
    this.searchRentals = this.searchRentals.bind(this);
  }

  componentDidMount() {
    this.selectAllCategories();
  }

  searchRentals = () => {
    let rentals = this.state.allRentals;
    rentals = this.filterByCategory(rentals);
    rentals = this.filterByKeyword(rentals);
    this.setState({
      filteredRentals: rentals
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

  filterByKeyword = (rentals) => {
    let filteredRentals = [];
    let keyword = this.state.query;

    for (const rental of rentals) {
      if ((rental.name.indexOf(keyword) !== -1) || (rental.details.description.indexOf(keyword) !== -1)) {
        filteredRentals.push(rental);
      }
    }
    return filteredRentals;
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

  handleCategorySearch = (event) => {
    event.preventDefault();
    let category = event.target.alt;
    let selectedCategories = this.state.selectedCategories;
    console.log(selectedCategories);

    let index = selectedCategories.indexOf(category);
    if (index !== -1) {
      selectedCategories.splice(index, 1);
    } else {
      selectedCategories.push(category);
    }
    this.setState({
      selectedCategories: selectedCategories
    }, () => {
      this.searchRentals();
    });
  };

  selectAllCategories = (event) => {
    let categories = this.state.allCategories;
    let selectedCategories = [];

    for (const category in categories) {
      selectedCategories.push(categories[category].name);
    }

    this.setState({
      selectedCategories: selectedCategories
    }, () => {
      this.searchRentals();
    });
  };

  unselectAllCategories = (event) => {
    this.setState({
      selectedCategories: []
    }, () => {
      this.searchRentals();
    });
  };

  filterByCategory = (rentals) => {
    let filteredRentals = [];
    let selectedCategories = this.state.selectedCategories;
    for (const rental of rentals) {
      if (selectedCategories.indexOf(rental.details.category) !== -1) {
        filteredRentals.push(rental);
      }
    }
    return filteredRentals;
  };

  render() {
    return (
      <div id="search-browse-view">
        <Search
          categories={this.state.allCategories}
          selectedCategories={this.state.selectedCategories}
          keywordSearch={this.handleKeywordSearch}
          radiusSearch={this.handleRadiusSearch}
          zipCodeSearch={this.handleZipCodeSearch}
          categorySearch={this.handleCategorySearch}
          selectAll={this.selectAllCategories}
          unselectAll={this.unselectAllCategories}
        />
        <Browse
          rentals={this.state.filteredRentals}
          query={this.state.query}
        />
      </div>
    );
  }
}

export default SearchBrowse;