import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: grid;
  background: white;
  padding: 1em;
`;

const NYOP = styled.div``;

const RentButton = styled.div``;

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
    var cost = this.checkFormData()
    if (cost) {
      console.log('gonna make request to server and send total cost: ', cost);
    }
  }

  checkFormData() {
    var sugPrice = this.state.suggestedPrice;
    var sugPriceIsValid = false;
    if (sugPrice !== null && sugPrice.length !== 0) {
      if (parseInt(sugPrice) < this.props.formInfo.minimumPrice) {
        alert('Suggested price is too low! Don\'t be cheap!');
        return false;
      } else {
        sugPriceIsValid = true;
      }
    }
    const pd = new Date(this.state.pickUpDate);
    const rd = new Date(this.state.returnDate);
    const diffTime = Math.abs(rd - pd);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    console.log(diffDays + " days");

    if (rd > pd) {
      var cost;
      if (sugPriceIsValid) {
        cost = diffDays * parseInt(sugPrice);
      } else {
        cost = diffDays * this.props.formInfo.price;
      }
      return cost;
    } else {
      alert('Return date must follow pick up date');
    }
    return false;
  }

  render() {
    var suggestedPrice = <NYOP><label htmlFor='suggestedPrice'>Suggested price per day ($):</label> <input type='number' min="0" step="1" placeholder='Round to nearest $' id='suggestedPrice' name='suggestedPrice' onChange={this.handleChange}></input> <br></br></NYOP>;
    var suggestedPriceLine = this.props.formInfo.nameYourOwnPrice ? suggestedPrice : null;

    var rentButton = <RentButton><input type='submit' value='Rent' onClick={this.handleSubmit}></input></RentButton>;
    var rentLine = this.props.availability ? rentButton : 'Item currently unavailable.';

    return (
      <Container>
        <form>
          Price per day ($): {this.props.formInfo.price} <br></br>
          <label htmlFor='pickUpDate'>Pickup Date: </label>
          <input type='date' id='pickUpDate' name='pickUpDate' onChange={this.handleChange}></input><br></br>
          <label htmlFor='returnDate'>Return Date:</label>
          <input type='date' id='returnDate' name='returnDate' onChange={this.handleChange}></input><br></br>
          {suggestedPriceLine}
          {rentLine}
        </form>
      </Container>
    )
  }
};

export default RentForm;

