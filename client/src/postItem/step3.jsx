import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';

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
      <div className="mx-auto" style={{padding: '5em'}}>
        <h3>How much do you want to rent it for?</h3>
        <form>
          <div className="form-row">
            <label htmlFor="price">Rate per day</label>
            <input type="text" className="form-control" id="price" placeholder="Required" onChange={handleChange('price')} value={values.price}/>
          </div>
          <div className="form-row">
            <label htmlFor="nyop">Name your own price</label>
            <div className="form-check form-switch">
              <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" onChange={handleChange('nameYourOwnPrice')} defaultValue={values.nameYourOwnPrice}/>
            </div>
          </div>
          <div className="form-row">
            <label htmlFor="price">Minimum accepted price</label>
            <input type="text" className="form-control" id="minimunAcceptedPrice" placeholder="Set the lowest price you will accept..." onChange={handleChange('minimunAcceptedPrice')} value={values.minimunAcceptedPrice}/>
          </div>
          <br/>
          <div className="d-grid gap-2 d-md-flex justify-content-md-end">
            <Button type="button" onClick={this.back}>Back</Button>
            <Button type="submit" onClick={this.continue}>Next</Button>
          </div>
        </form>
      </div>
    );
  }
}

export default Step3;