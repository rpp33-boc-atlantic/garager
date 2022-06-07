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
    this.toggleAlert = this.toggleAlert.bind(this);
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
      const ownerName = this.props.itemInfo.details.firstname + ' ' + this.props.itemInfo.details.lastname;
      const itemInfo = {
        name: this.props.itemInfo.details.title,
        itemID: this.props.itemInfo.details.itemID,
        owner: ownerName,
        priceInCents: cost,
        dateRange: this.state.dateRange
      };

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
      if (parseInt(sugPrice) < this.props.itemInfo.details.min_price) {
        this.toggleAlert('on');
        return false;
      } else {
        this.toggleAlert('off');
        sugPriceIsValid = true;
      }
    }

    const pd = new Date(this.state.dateRange[0].toLocaleDateString('en-US'));
    const rd = new Date(this.state.dateRange[1].toLocaleDateString('en-US'));
    const diffTime = Math.abs(rd - pd);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
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
        cost = diffDays * this.props.itemInfo.details.price;
      }
    }
    return cost * 100;
  }

  grabDateRange(range) {
    this.setState({
      dateRange: range
    }, () => {
      console.log('state', this.state.dateRange);
    });
  }

  toggleAlert(status) {
    const tooLow = document.querySelector('.tooLow');
    const isHidden = tooLow.style.display === 'none';
    if (isHidden) {
      tooLow.style.display = 'block';
    } else if (status === 'off') {
      tooLow.style.display = 'none';
    }
  }

  render() {
    var suggestedPrice = <NYOP><label htmlFor='suggestedPrice'>Suggested price per day ($):</label> <input type='number' min="0" step="1" placeholder='Round to nearest $' id='suggestedPrice' name='suggestedPrice' onChange={this.handleChange}></input> <br></br></NYOP>;
    var suggestedPriceLine = this.props.itemInfo.details.nyop ? suggestedPrice : null;

    return (
      <Container>
        <CalendarView grabDateRange={this.grabDateRange} datesBooked={this.props.itemInfo.datesBooked} availabilityRange={this.props.itemInfo.details}></CalendarView>
        <form>
          <h6>Price per day ($): {this.props.itemInfo.details.price}</h6>
          {suggestedPriceLine}
          <div className='alert alert-warning alert-dismissible fade show tooLow' role='alert' style={{display: 'none'}}>
            <strong>Suggested price is too low.</strong>
            {/* <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={this.toggleAlert}>
              <span aria-hidden="true">&times;</span>
            </button> */}
          </div>
          <RentButton><input type='submit' value='Rent' onClick={this.handleSubmit}></input></RentButton>
        </form>
      </Container>
    );
  }
}

export default RentForm;












// import React from 'react';
// import styled from 'styled-components';
// import CalendarView from './CalendarView.jsx';
// import axios from 'axios';
// import moment from 'moment';

// const Container = styled.div`
//   display: grid;
//   // background: white;
//   padding: 1em;
// `;

// const NYOP = styled.div``;

// const RentButton = styled.div``;

// class RentForm extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       pickUpDate: null,
//       returnDate: null,
//       suggestedPrice: null,
//       dateRange: []
//     };

//     this.handleChange = this.handleChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//     this.checkFormData = this.checkFormData.bind(this);
//     this.grabDateRange = this.grabDateRange.bind(this);
//   }

//   handleChange(e) {
//     e.preventDefault();
//     this.setState({
//       [e.target.id]: e.target.value
//     }, ()=> {
//       console.log('state', this.state);
//     });

//   }

//   handleSubmit(e) {
//     e.preventDefault();
//     var cost = this.checkFormData();
//     // console.log('cost right here', cost);
//     if (cost) {
//       // console.log('this is the cost in cents:', cost);
//       // console.log('clicked here checkout button');
//       // ***** replace with actual ItemView Data *****
//       // send name of rented item
//       // owner's name
//       // date range
//       const ownerName = this.props.itemInfo.details.firstname + ' ' + this.props.itemInfo.details.lastname;
//       const itemInfo = {
//         name: this.props.itemInfo.details.title,
//         itemID: this.props.itemInfo.details.itemID,
//         owner: ownerName,
//         priceInCents: cost,
//         dateRange: this.state.dateRange
//       };

//       axios.post('/checkout/create-session', itemInfo)
//         .then((response) => {
//           console.log('response from checkoutButton', response);
//           window.location = response.data.url;
//         })
//         .catch((error) => {
//           console.log('ERROR from checkoutButton', error);
//         });

//     }
//   }

//   checkFormData() {
//     var sugPrice = this.state.suggestedPrice;
//     var sugPriceIsValid = false;
//     if (sugPrice !== null && sugPrice.length !== 0) {
//       if (parseInt(sugPrice) < this.props.itemInfo.details.min_price) {
//         alert('Suggested price is too low!');
//         return false;
//       } else {
//         sugPriceIsValid = true;
//       }
//     }

//     const pd = new Date(this.state.dateRange[0].toLocaleDateString('en-US'));
//     const rd = new Date(this.state.dateRange[1].toLocaleDateString('en-US'));
//     const diffTime = Math.abs(rd - pd);
//     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
//     // console.log(diffDays + 'days');
//     const formattedPD = moment(pd).format().substring(0, 10);
//     const formattedRD = moment(rd).format().substring(0, 10);

//     var cost;
//     if (sugPriceIsValid) {
//       if (formattedPD === formattedRD) {
//         cost = 1 * parseInt(sugPrice);
//       } else {
//         cost = diffDays * parseInt(sugPrice);
//       }
//     } else {
//       if (formattedPD === formattedRD) {
//         cost = this.props.itemInfo.price;
//       } else {
//         cost = diffDays * this.props.itemInfo.details.price;
//       }
//     }
//     return cost * 100;
//   }

//   grabDateRange(range) {
//     // console.log('this is the date range', range);
//     this.setState({
//       dateRange: range
//     }, () => {
//       console.log('state', this.state.dateRange);
//     });

//   }

//   render() {
//     var suggestedPrice = <NYOP><label htmlFor='suggestedPrice'>Suggested price per day ($):</label> <input type='number' min="0" step="1" placeholder='Round to nearest $' id='suggestedPrice' name='suggestedPrice' onChange={this.handleChange}></input> <br></br></NYOP>;
//     var suggestedPriceLine = this.props.itemInfo.details.nyop ? suggestedPrice : null;

//     return (
//       <Container>
//         <CalendarView grabDateRange={this.grabDateRange} datesBooked={this.props.itemInfo.datesBooked} availabilityRange={this.props.itemInfo.details}></CalendarView>
//         <form>
//           <h6>Price per day ($): {this.props.itemInfo.details.price}</h6>
//           {suggestedPriceLine}
//           <RentButton><input type='submit' value='Rent' onClick={this.handleSubmit}></input></RentButton>
//         </form>
//       </Container>
//     );
//   }
// }

// export default RentForm;