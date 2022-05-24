import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Step1 from './step1.jsx';
import Step2 from './step2.jsx';
import Step3 from './step3.jsx';
import Step4 from './step4.jsx';
import Step5 from './step5.jsx';

class PostItem extends Component {
  constructor (props) {
    super (props);
    this.state = {
      step: 0,
      title: '',
      category: '',
      brand: '',
      model: '',
      description: '',
      price: 0,
      nameYourOwnPrice: false,
      minimunAcceptedPrice: 0,
      pickUpLocation: '',
      availableFrom: '',
      availableTo: ''
    };
    this.changeToPrevious = this.changeToPrevious.bind(this);
    this.changeToNext = this.changeToNext.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  changeToPrevious () {
    const { step } = this.state;
    this.setState ({
      step: step - 1
    });
  }

  changeToNext () {
    const { step } = this.state;
    this.setState ({
      step: step + 1
    });
  }

  handleChange (input) {
    return (e)=> {
      this.setState ({ [input]: e.target.value });
    };
  }

  render () {
    const { step } = this.state;
    const { title, category, brand, model, description, price, nameYourOwnPrice, minimunAcceptedPrice, pickUpLocation, availableFrom, availableTo } = this.state;
    const values = { title, category, brand, model, description, price, nameYourOwnPrice, minimunAcceptedPrice, pickUpLocation, availableFrom, availableTo };

    switch (step) {
    case 1:
      return (
        <Step1
          changeToNext={this.changeToNext}
          handleChange={this.handleChange}
          values={values}
        />
      );
    case 2:
      return (
        <Step2
          changeToPrevious={this.changeToPrevious}
          changeToNext={this.changeToNext}
          handleChange={this.handleChange}
          values={values}
        />
      );
    case 3:
      return (
        <Step3
          changeToPrevious={this.changeToPrevious}
          changeToNext={this.changeToNext}
          handleChange={this.handleChange}
          values={values}
        />
      );
    case 4:
      return (
        <Step4
          changeToPrevious={this.changeToPrevious}
          changeToNext={this.changeToNext}
          handleChange={this.handleChange}
          values={values}
        />
      );
    case 5:
      return (
        <Step5
          changeToPrevious={this.changeToPrevious}
          handleChange={this.handleChange}
          values={values}
        />
      );
    default:
      return (
        <>
          <h5>Post an item for rent in 5 easy steps</h5>
          <Button
            onClick={this.changeToNext}
          >Let's Go!</Button>
        </>
      );
    }
  }
}

export default PostItem;