import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: grid;
  background: white;
  padding: 1em;
`;

const NYOP = styled.div``;

class RentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pickUpDate: null,
      returnDate: null,
      suggestedPrice: null
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.checkFormData = this.checkFormData.bind(this);
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({
      [e.target.id]: e.target.value
    }, ()=> {
      console.log('state', this.state);
    })

  }

  handleSubmit(e) {
    e.preventDefault();
    if(this.checkFormData()) {
      // call server and proceed to checkout
      console.log('gonna make request to server');
    }
  }

  checkFormData() {
    if (this.state.suggestedPrice !== null && this.state.suggestedPrice.length !== 0) {
      if (parseInt(this.state.suggestedPrice) < this.props.formInfo.minimumPrice) {
        alert('Suggested price is too low! Don\'t be cheap!');
        return false;
      }
    }
    const pd = new Date(this.state.pickUpDate);
    const rd = new Date(this.state.returnDate);

    if (rd > pd) {
      console.log('All good')
      return true;
    } else {
      alert('Return date must follow pick up date');
    }
  }

  render() {
    var suggestedPrice = <NYOP><label htmlFor='suggestedPrice'>Suggested Price ($):</label> <input type='number' min="0" step="1" placeholder='Round to nearest $' id='suggestedPrice' name='suggestedPrice' onChange={this.handleChange}></input> <br></br></NYOP>;
    var suggestedPriceLine = this.props.formInfo.nameYourOwnPrice ? suggestedPrice : null;

    return (
      <Container>
        <form>
          Price per day ($): {this.props.formInfo.price} <br></br>
          <label htmlFor='pickUpDate'>Pickup Date: </label>
          <input type='date' id='pickUpDate' name='pickUpDate' onChange={this.handleChange}></input><br></br>
          <label htmlFor='returnDate'>Return Date:</label>
          <input type='date' id='returnDate' name='returnDate' onChange={this.handleChange}></input><br></br>
          {suggestedPriceLine}
          <input type='submit' value='Rent' onClick={this.handleSubmit}></input>
        </form>
      </Container>
    )
  }
};

export default RentForm;

