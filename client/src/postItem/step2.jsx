import React, { Component } from 'react';

//Step2 includes Category (drop list), brand, model, description
const categories = ['Automative', 'Household'];

class Step2 extends Component {
  constructor (props) {
    super (props);
    this.continue = this.continue.bind(this);
    this.back = this.back.bind(this);
  }

  continue (e) {
    e.preventDefault();
    this.props.changeToNext();
  }

  back (e) {
    e.preventDefault();
    this.props.changeToPrevious();
  }

  render () {
    const { values, handleChange } = this.props;

    return (
      <React.Fragment>
        <h3>A little more details...</h3>
        <form>
          <div className="form-row">
            <label htmlFor="category">Category</label>
            <select className="category" onChange={handleChange('category')} defaultValue={values.category || ''}>
              <option defaultValue="choose">Choose...</option>
              <option defaultValue="1">Household</option>
              <option defaultValue="2">Automative</option>
            </select>
          </div>
          <div className="form-row">
            <label htmlFor="brand">Brand</label>
            <input type="text" className="form-control" id="brand" placeholder="Optional" onChange={handleChange('brand')} value={values.brand}/>
          </div>
          <div className="form-row">
            <label htmlFor="model">Model</label>
            <input type="text" className="form-control" id="model" placeholder="Optional" onChange={handleChange('model')} value={values.model}/>
          </div>
          <div className="form-row">
            <label htmlFor="item_description">Description</label>
            <input type="text" className="form-control" id="description" placeholder="Items with a detailed description rent faster!" onChange={handleChange('itemDescription')} value={values.itemDescription}/>
          </div>
        </form>
        <button
          type="submit" className="btn"
          onClick={this.back}
        >Back</button>
        <button
          type="submit" className="btn"
          onClick={this.continue}
        >Next</button>
      </React.Fragment>
    );
  }
}

export default Step2;