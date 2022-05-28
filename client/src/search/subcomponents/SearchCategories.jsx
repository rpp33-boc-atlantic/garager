import React from 'react';

const SearchCategories = (props) => {


  return (
    <div id="search-categories">
      <span>Categories</span>
      <div id="category-seach-icons">
        {Object.keys(props.categories).map((key) =>
          <a className="category-search" key={key} title={key}>
            <img src={props.categories[key]} alt={key}></img>
          </a>
        )}
      </div>
    </div>
  );
};

export default SearchCategories;