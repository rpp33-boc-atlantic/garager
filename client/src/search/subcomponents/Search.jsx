import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Button } from 'react-bootstrap';

import SearchCategories from './SearchCategories.jsx';

const Search = (props) => {

  return (
    <div id="search-column">
      <span className="column-title">FIND RENTALS</span>
      <div className="search-function">
        <span className="search-title">Keyword</span>
        <label htmlFor="keyword-search" hidden>keyword-search</label>
        <input type="text" id="keyword-search" name="keyword-search" placeholder="Search Here!" onChange={props.keywordSearch}></input>
      </div>
      <div className="search-function">
        <span className="search-title">Location</span>
        <div id="mile-radius-search">
          <select name="distance" id="distance-dropdown" data-testid="distance" onChange={props.radiusSearch}>
            <option value="24902">any</option>
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
            <option value="150">150</option>
          </select>
          <span>&nbsp;miles from&nbsp;</span>
          <label htmlFor="zipcode-search" hidden>zipcode-search</label>
          <input type="text" id="zipcode-search" name="zipcode-search" placeholder="ZIP Code" onChange={props.zipCodeSearch}></input>
        </div>
      </div>
      <div className="search-function">
        <span className="search-title">Availability</span>
        <div id="availability-search">
          <span>Available from </span>
          <DatePicker
            placeholderText={'MM/DD/YYYY'}
            selected={props.startDate}
            onChange={props.startDateSearch}
            startDate={props.startDate}
            endDate={props.endDate}
          />
          <span> to </span>
          <DatePicker
            placeholderText={'MM/DD/YYYY'}
            selected={props.endDate}
            onChange={props.endDateSearch}
            startDate={props.startDate}
            endDate={props.endDate}
          />
        </div>
      </div>
      <div className="search-function">
        <span className="search-title">Category</span>
        <SearchCategories
          categories={props.categories}
          selectedCategories={props.selectedCategories}
          categorySearch={props.categorySearch}
          selectAll={props.selectAll}
          unselectAll={props.unselectAll}
        />
      </div>
      <Button onClick={props.clearFilters}>Clear All Filters</Button>
    </div>
  );
};

export default Search;