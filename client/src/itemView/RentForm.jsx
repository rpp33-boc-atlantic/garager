import React from 'react';
import styled from 'styled-components';
import CalendarView from './CalendarView.jsx';
import axios from 'axios';

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
    if (cost) {
      console.log('this is the cost in cents:', cost);
      console.log('clicked here checkout button');
      // ***** replace with actual ItemView Data *****
      // send name of rented item
      // owner's name
      // date range
      const itemInfo = {
        name: this.props.name,
        itemID: this.props.itemID,
        owner: this.props.owner.name,
        priceInCents: cost,
        dateRange: this.state.dateRange
        // dateRange: ['2022-06-03', '2022-06-04']
      };
      console.log('item info,', itemInfo)

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
      if (parseInt(sugPrice) < this.props.formInfo.minimumPrice) {
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
    console.log(diffDays + 'days');

    // make sure they can't rent during days that the item isn't available
    var cost;
    if (sugPriceIsValid) {
      cost = diffDays * parseInt(sugPrice);
    } else {
      cost = diffDays * this.props.formInfo.price;
    }
    return cost * 100;
  }

  grabDateRange(range) {
    console.log('this is the date range', range);
    this.setState({
      dateRange: range
    }, () => {
      console.log('state', this.state.dateRange);
    });

  }

  render() {
    var suggestedPrice = <NYOP><label htmlFor='suggestedPrice'>Suggested price per day ($):</label> <input type='number' min="0" step="1" placeholder='Round to nearest $' id='suggestedPrice' name='suggestedPrice' onChange={this.handleChange}></input> <br></br></NYOP>;
    var suggestedPriceLine = this.props.formInfo.nameYourOwnPrice ? suggestedPrice : null;

    return (
      <Container>
        <CalendarView grabDateRange={this.grabDateRange}></CalendarView>
        <form>
          <h6>Price per day ($): {this.props.formInfo.price}</h6>
          {suggestedPriceLine}
          <RentButton><input type='submit' value='Rent' onClick={this.handleSubmit}></input></RentButton>
        </form>
      </Container>
    );
  }
}

export default RentForm;







// checkFormData() {
//   var sugPrice = this.state.suggestedPrice;
//   var sugPriceIsValid = false;
//   if (sugPrice !== null && sugPrice.length !== 0) {
//     if (parseInt(sugPrice) < this.props.formInfo.minimumPrice) {
//       alert('Suggested price is too low! Don\'t be cheap!');
//       return false;
//     } else {
//       sugPriceIsValid = true;
//     }
//   }

//   const pd = new Date(this.state.pickUpDate);
//   const rd = new Date(this.state.returnDate);
//   const diffTime = Math.abs(rd - pd);
//   const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
//   console.log(diffDays + 'days');

//   if (rd > pd) {
//     var cost;
//     if (sugPriceIsValid) {
//       cost = diffDays * parseInt(sugPrice);
//     } else {
//       cost = diffDays * this.props.formInfo.price;
//     }
//     return cost * 100;
//   } else {
//     alert('Return date must follow pick up date');
//   }
//   return false;
// }










// DROP TABLE IF EXISTS transactions;
// CREATE TABLE transactions(
//   id SERIAL PRIMARY KEY,
//   rate INT NOT NULL DEFAULT NULL,
//   pickUpDate DATE NOT NULL DEFAULT NULL,
//   returnDate DATE NOT NULL DEFAULT NULL,
//   owner_id INT,
//   renter_id INT,
//   item_id INT,
//   CONSTRAINT fk_owner
//     FOREIGN KEY(owner_id)
//       REFERENCES users(id)
//       ON DELETE CASCADE,
//   CONSTRAINT fk_renter
//     FOREIGN KEY(renter_id)
//       REFERENCES users(id)
//       ON DELETE CASCADE,
//   CONSTRAINT fk_item
//     FOREIGN KEY(item_id)
//     REFERENCES items(item_id)
//     ON DELETE CASCADE
// );

// CREATE INDEX item_index ON transactions(item_id);