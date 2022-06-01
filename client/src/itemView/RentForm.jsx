import React from 'react';
import styled from 'styled-components';
import CalendarView from './CalendarView.jsx';
import axios from 'axios';
import moment from 'moment';

const Container = styled.div`
  display: grid;
  // background: white;
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
      suggestedPrice: null,
      dateRange: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.checkFormData = this.checkFormData.bind(this);
    this.grabDateRange = this.grabDateRange.bind(this);
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({
      [e.target.id]: e.target.value
    }, ()=> {
      console.log('state', this.state);
    });

  }

  handleSubmit(e) {
    e.preventDefault();
    var cost = this.checkFormData();
    // console.log('cost right here', cost);
    if (cost) {
      // console.log('this is the cost in cents:', cost);
      // console.log('clicked here checkout button');
      // ***** replace with actual ItemView Data *****
      // send name of rented item
      // owner's name
      // date range
      const itemInfo = {
        name: this.props.itemInfo.name,
        itemID: this.props.itemInfo.itemID,
        owner: this.props.itemInfo.owner.name,
        priceInCents: cost,
        dateRange: this.state.dateRange
        // dateRange: ['2022-06-03', '2022-06-04']
      };
      // console.log('item info,', itemInfo);

      axios.post('/checkout/create-session', itemInfo)
        .then((response) => {
          console.log('response from checkoutButton', response);
          window.location = response.data.url;
        })
        .catch((error) => {
          console.log('ERROR from checkoutButton', error);
        });

    }
  }

  checkFormData() {
    var sugPrice = this.state.suggestedPrice;
    var sugPriceIsValid = false;
    if (sugPrice !== null && sugPrice.length !== 0) {
      if (parseInt(sugPrice) < this.props.itemInfo.minimumPrice) {
        alert('Suggested price is too low! Don\'t be cheap!');
        return false;
      } else {
        sugPriceIsValid = true;
      }
    }

    const pd = new Date(this.state.dateRange[0].toLocaleDateString('en-US'));
    const rd = new Date(this.state.dateRange[1].toLocaleDateString('en-US'));
    const diffTime = Math.abs(rd - pd);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    // console.log(diffDays + 'days');
    const formattedPD = moment(pd).format().substring(0, 10);
    const formattedRD = moment(rd).format().substring(0, 10);

    var cost;
    if (sugPriceIsValid) {
      if (formattedPD === formattedRD) {
        cost = 1 * parseInt(sugPrice);
      } else {
        cost = diffDays * parseInt(sugPrice);
      }
    } else {
      if (formattedPD === formattedRD) {
        cost = this.props.itemInfo.price;
      } else {
        cost = diffDays * this.props.itemInfo.price;
      }
    }
    return cost * 100;
  }

  grabDateRange(range) {
    // console.log('this is the date range', range);
    this.setState({
      dateRange: range
    }, () => {
      console.log('state', this.state.dateRange);
    });

  }

  render() {
    var suggestedPrice = <NYOP><label htmlFor='suggestedPrice'>Suggested price per day ($):</label> <input type='number' min="0" step="1" placeholder='Round to nearest $' id='suggestedPrice' name='suggestedPrice' onChange={this.handleChange}></input> <br></br></NYOP>;
    var suggestedPriceLine = this.props.itemInfo.nameYourOwnPrice ? suggestedPrice : null;

    return (
      <Container>
        <CalendarView grabDateRange={this.grabDateRange} rangesBooked={this.props.itemInfo.rangesBooked}></CalendarView>
        <form>
          <h6>Price per day ($): {this.props.itemInfo.price}</h6>
          {suggestedPriceLine}
          <RentButton><input type='submit' value='Rent' onClick={this.handleSubmit}></input></RentButton>
        </form>
      </Container>
    );
  }
}

export default RentForm;
