import React from 'react';

class SearchCategories extends React.Component {
  constructor(props) {
    super(props);
    this.highlightSelectedCategories = this.highlightSelectedCategories.bind(this);
  }

  highlightSelectedCategories = (category) => {
    if (this.props.selectedCategories.indexOf(category) !== -1) {
      return 'category-icon-on';
    } else {
      return 'category-icon-off';
    }
  };

  render() {
    return (
      <div id="search-categories">
        <span>Categories</span>
        <div id='category-multiselect'>
          <a onClick={this.props.selectAll}>Select All</a>
          <span> | </span>
          <a onClick={this.props.unselectAll}>Unselect All</a>
        </div>
        <div id="category-seach-icons">
          {Object.keys(this.props.categories).map((category) =>
            <a className="category-search" key={category} title={category} onClick={this.props.categorySearch}>
              <img className={this.highlightSelectedCategories(category)} src={this.props.categories[category].image} id={category} alt={category}></img>
            </a>
          )}
        </div>
      </div>
    );
  }
}

export default SearchCategories;