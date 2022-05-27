import React, { Component } from 'react';

//Step3 includes price, nyop, minimum accepted price

class Step3 extends Component {
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
        <h3>How much do you want to rent it for?</h3>
        <form>
          <div className="form-row">
            <label htmlFor="price">Rate per day</label>
            <input type="text" className="form-control" id="price" placeholder="Required"  onChange={handleChange('price')} value={values.price}/>
          </div>
          <div className="form-row">
            <label htmlFor="nyop">Name your own price</label>
            <div className="form-check form-switch">
              <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" onChange={handleChange('nameYourOwnPrice')} defaultValue={values.nameYourOwnPrice}/>
            </div>
          </div>
          <div className="form-row">
            <label htmlFor="price">Minimum accepted price</label>
            <input type="text" className="form-control" id="minimunAcceptedPrice" placeholder="Set the lowest price you will accept..."  onChange={handleChange('minimunAcceptedPrice')} value={values.minimunAcceptedPrice}/>
          </div>
          <button
            type="submit" className="btn"
            onClick={this.back}
          >Back</button>
          <button
            type="submit" className="btn"
            onClick={this.continue}
          >Next</button>
        </form>
      </React.Fragment>
    );
  }
}

export default Step3;