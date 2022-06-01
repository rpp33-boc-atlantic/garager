import React from 'react';
import axios from 'axios';
import models from '../../../server/models/browse.models.js';
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
      location: ''
    };
    this.handleKeywordSearch = this.handleKeywordSearch.bind(this);
    this.filterByKeyword = this.filterByKeyword.bind(this);
    this.handleZipCodeSearch = this.handleZipCodeSearch.bind(this);
    this.validateZipCode = this.validateZipCode.bind(this);
    this.handleRadiusSearch = this.handleRadiusSearch.bind(this);
    this.retrieveLocationCoordinates = this.retrieveLocationCoordinates.bind(this);
    this.calculateDistance = this.calculateDistance.bind(this);
    this.filterByDistance = this.filterByDistance.bind(this);
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
    rentals = this.filterByDistance(rentals);
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

  handleRadiusSearch = (event) => {
    event.preventDefault();

    let mileRadius = event.target.value;

    this.setState({
      radius: mileRadius
    }, () => {
      this.searchRentals();
    });
  };

  retrieveLocationCoordinates = async (zipCode) => {
    return models.latLng.get(zipCode);
  };

  handleZipCodeSearch = async (event) => {
    event.preventDefault();
    let zipCode = event.target.value;

    if (this.validateZipCode(zipCode)) {
      let latLng = await this.retrieveLocationCoordinates(zipCode);
      this.setState({
        location: latLng
      }, () => {
        this.searchRentals();
      });
    }
  };

  validateZipCode = (zipCode) => {
    const zipCodeUSA = /(^\d{5}$)/.test(zipCode);
    const zipCodeCAN = /^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ -]?\d[ABCEGHJ-NPRSTV-Z]\d$/i.test(zipCode);

    if (zipCodeUSA || zipCodeCAN) {
      return true;
    }
  };

  calculateDistance = (destination) => {
    const degreesToRadians = (degrees) => {
      return degrees * (Math.PI / 180);
    };

    const earthRadius = 3960;
    let origin = this.state.location;
    let latDestination = degreesToRadians(destination.lat);
    let latOrigin = degreesToRadians(origin.lat);
    let latDistance = degreesToRadians(origin.lat - destination.lat);
    let lngDistance = degreesToRadians(origin.lng - destination.lng);


    let a = Math.pow(Math.sin(latDistance / 2), 2)
        + Math.cos(latDestination) * Math.cos(latOrigin)
        * Math.pow(Math.sin(lngDistance / 2), 2);
    let centralAngle = 2 * Math.asin(Math.sqrt(a));

    return (centralAngle * earthRadius);
  };

  filterByDistance = (rentals) => {
    let filteredRentals = [];
    let radius = this.state.radius;


    for (const rental of rentals) {
      let distance = this.calculateDistance(rental.details.location);
      if (distance < radius || !radius) {
        filteredRentals.push(rental);
      }
    }
    return filteredRentals;
  };

  handleCategorySearch = (event) => {
    event.preventDefault();
    let category = event.target.alt;
    let selectedCategories = this.state.selectedCategories;

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