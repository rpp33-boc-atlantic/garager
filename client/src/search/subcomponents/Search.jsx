import React from 'react';

import SearchCategories from './SearchCategories.jsx';

const Search = (props) => {
  return (
    <div id="search-column">
      <span>FIND YOUR NEXT RENTAL</span>
      <input type="text" id="keyword-search" placeholder="Search Here!" onChange={props.keywordSearch}></input>
      <div id="mile-radius-search">
        <span>Within </span>
        <select name="distance" id="distance-dropdown">
          <option value="">any</option>
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
          <option value="100">100</option>
          <option value="150">150</option>
        </select>
        <span> miles from </span>
        <input type="text" id="zipcode-search" placeholder="ZIP Code"></input>
      </div>
      <SearchCategories
        categories={props.categories}
        selectedCategories={props.selectedCategories}
        categorySearch={props.categorySearch}
        selectAll={props.selectAll}
        unselectAll={props.unselectAll}
      />
    </div>
  );
};

export default Search;