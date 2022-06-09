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

const NYOP = styled.div`
  padding: '.4em'
`;

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
    var result = this.checkFormData();
    var cost = result[0];
    if (cost) {
      const ownerName = this.props.itemInfo.details.firstname + ' ' + this.props.itemInfo.details.lastname;
      const itemInfo = {
        name: this.props.itemInfo.details.title,
        itemID: this.props.itemInfo.details.item_id,
        owner: ownerName,
        ownerID: this.props.itemInfo.details.user_id,
        priceInCents: cost,
        dateRange: this.state.dateRange,
        rate: result[1]
        // PASS IN USER ID RIGHT HERE
      };
      console.log('itemInfo before passing to checkout', itemInfo);

      axios.post('/checkout/create-session', itemInfo)
        .then((response) => {
          console.log('response from checkoutButton', response);
          window.location = response.data.url;
        })
        .catch((error) => {
          alert(error.response.data); // <-- ADDED BY JO FOR SIMPLE ERROR HANDLING
        });
    }
  }

  checkFormData() {
    var sugPrice = this.state.suggestedPrice;
    var sugPriceIsValid = false;
    if (sugPrice !== null && sugPrice.length !== 0) {
      // console.log('props right here', this.props.itemInfo.details);
      if (parseInt(sugPrice) < parseInt(this.props.itemInfo.details.min_price)) {
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
    var rateUsed = this.props.itemInfo.details.price;
    if (sugPriceIsValid) {
      if (formattedPD === formattedRD) {
        cost = 1 * parseInt(sugPrice);
        rateUsed = parseInt(sugPrice);
      } else {
        cost = diffDays * parseInt(sugPrice);
        rateUsed = parseInt(sugPrice);
      }
    } else {
      if (formattedPD === formattedRD) {
        cost = this.props.itemInfo.price;
      } else {
        cost = diffDays * this.props.itemInfo.details.price;
      }
    }
    // return cost * 100;
    return [cost * 100, rateUsed];
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
      tooLow.style.visibility = 'hidden';
    }
  }

  render() {
    var suggestedPrice = <NYOP style={{ padding: '.4em'}}><label htmlFor='suggestedPrice'>Suggested price per day ($):</label> <input type='number' min="0" step="1" placeholder='Round to nearest $' id='suggestedPrice' name='suggestedPrice' onChange={this.handleChange}></input> <br></br></NYOP>;
    var suggestedPriceLine = this.props.itemInfo.details.nyop ? suggestedPrice : null;

    return (
      <Container>
        <CalendarView grabDateRange={this.grabDateRange} datesBooked={this.props.itemInfo.datesBooked} availabilityRange={this.props.itemInfo.details}></CalendarView>
        <form>
          <h6 style={{ padding: '.4em'}}>Price per day ($): {this.props.itemInfo.details.price} </h6>
          {suggestedPriceLine}
          <div className='alert alert-warning alert-dismissible fade show tooLow' role='alert' style={{display: 'none'}}>
            <strong>Suggested price is too low.</strong>
          </div>
          <RentButton><input type='submit' value='Rent' onClick={this.handleSubmit} className="btn btn-primary btn-sm" style={{ paddingLeft: '.8em', paddingRight: '.8em', paddingTop: '.2em', paddingBottom:'.2em', marginLeft: '.4em'}}></input></RentButton>
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
//     this.toggleAlert = this.toggleAlert.bind(this);
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
//     // var result = this.checkFormData();
//     var cost = this.checkFormData();
//     if (cost) {
//       const ownerName = this.props.itemInfo.details.firstname + ' ' + this.props.itemInfo.details.lastname;
//       const itemInfo = {
//         name: this.props.itemInfo.details.title,
//         itemID: this.props.itemInfo.details.item_id,
//         owner: ownerName,
//         ownerID: this.props.itemInfo.details.user_id,
//         priceInCents: cost,
//         dateRange: this.state.dateRange,
//         rate: this.props.itemInfo.details.price
//         // PASS IN USER ID RIGHT HERE
//       };
//       console.log('itemInfo before passing to checkout', itemInfo);

//       // axios.post('/checkout/create-session', itemInfo)
//       //   .then((response) => {
//       //     console.log('response from checkoutButton', response);
//       //     window.location = response.data.url;
//       //   })
//       //   .catch((error) => {
//       //     alert(error.response.data); // <-- ADDED BY JO FOR SIMPLE ERROR HANDLING
//       //   });
//     }
//   }

//   checkFormData() {
//     var sugPrice = this.state.suggestedPrice;
//     var sugPriceIsValid = false;
//     if (sugPrice !== null && sugPrice.length !== 0) {
//       if (parseInt(sugPrice) < this.props.itemInfo.details.min_price) {
//         this.toggleAlert('on');
//         return false;
//       } else {
//         this.toggleAlert('off');
//         sugPriceIsValid = true;
//       }
//     }

//     const pd = new Date(this.state.dateRange[0].toLocaleDateString('en-US'));
//     const rd = new Date(this.state.dateRange[1].toLocaleDateString('en-US'));
//     const diffTime = Math.abs(rd - pd);
//     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
//     const formattedPD = moment(pd).format().substring(0, 10);
//     const formattedRD = moment(rd).format().substring(0, 10);

//     var cost;
//     var rateUsed = this.props.itemInfo.details.price;
//     if (sugPriceIsValid) {
//       if (formattedPD === formattedRD) {
//         cost = 1 * parseInt(sugPrice);
//         rateUsed = parseInt(sugPrice);
//       } else {
//         cost = diffDays * parseInt(sugPrice);
//         rateUsed = parseInt(sugPrice);
//       }
//     } else {
//       if (formattedPD === formattedRD) {
//         cost = this.props.itemInfo.price;
//       } else {
//         cost = diffDays * this.props.itemInfo.details.price;
//       }
//     }
//     return cost * 100;
//     // return [cost * 100, rateUsed];
//   }

//   grabDateRange(range) {
//     this.setState({
//       dateRange: range
//     }, () => {
//       console.log('state', this.state.dateRange);
//     });
//   }

//   toggleAlert(status) {
//     const tooLow = document.querySelector('.tooLow');
//     const isHidden = tooLow.style.display === 'none';
//     if (isHidden) {
//       tooLow.style.display = 'block';
//     } else if (status === 'off') {
//       tooLow.style.display = 'none';
//     }
//   }

//   render() {
//     var suggestedPrice = <NYOP><label htmlFor='suggestedPrice'>Suggested price per day ($):</label> <input type='number' min="0" step="1" placeholder='Round to nearest $' id='suggestedPrice' name='suggestedPrice' onChange={this.handleChange}></input> <br></br></NYOP>;
//     var suggestedPriceLine = this.props.itemInfo.details.nyop ? suggestedPrice : null;

//     return (
//       <Container>
//         <CalendarView grabDateRange={this.grabDateRange} datesBooked={this.props.itemInfo.datesBooked} availabilityRange={this.props.itemInfo.details}></CalendarView>
//         <form>
//           <h6 style={{ padding: '.4em'}}>Price per day ($): {this.props.itemInfo.details.price} </h6>
//           {suggestedPriceLine}
//           <div className='alert alert-warning alert-dismissible fade show tooLow' role='alert' style={{display: 'none'}}>
//             <strong>Suggested price is too low.</strong>
//           </div>
//           <RentButton><input type='submit' value='Rent' onClick={this.handleSubmit} className="btn btn-primary btn-sm" style={{ padding: '.2em', marginLeft: '.4em'}}></input></RentButton>
//         </form>
//       </Container>
//     );
//   }
// }

// export default RentForm;


