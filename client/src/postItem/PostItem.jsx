/* eslint-disable camelcase */
import React, { Component } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import moment from 'moment';

import Step1 from './Step1.jsx';
import Step2 from './Step2.jsx';
import Step3 from './Step3.jsx';
import Step4 from './Step4.jsx';
import Step5 from './Step5.jsx';
import ConfirmationPage from './ConfirmationPage.jsx';

const initialState = {
  step: 0,
  userId: null,
  title: 'n/a',
  category: 'n/a',
  brand: 'n/a',
  model: 'n/a',
  itemDescription: 'n/a',
  price: 0,
  nameYourOwnPrice: false,
  minimunAcceptedPrice: 0,
  availableFrom: 'n/a',
  availableTo: 'n/a',
  photos: [],
  latLng: {},
  address: 'n/a'
};

class PostItem extends Component {
  constructor (props) {
    super (props);
    this.state = initialState;
    this.reset = this.reset.bind(this);
    this.changeToPrevious = this.changeToPrevious.bind(this);
    this.changeToNext = this.changeToNext.bind(this);
    this.updateUserId = this.updateUserId.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleUploadPhotos = this.handleUploadPhotos.bind(this);
    this.handleSelectLocation = this.handleSelectLocation.bind(this);
    this.handlePost = this.handlePost.bind(this);
  }
  reset () {
    this.setState(initialState);
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

  updateUserId (id) {
    this.setState({ userId: id });
  }

  handleChange (input) {
    return (e)=> {
      if (input === 'nameYourOwnPrice') {
        this.setState({ [input]: e.target.checked });
      } else {
        this.setState ({ [input]: e.target.value });
      }
    };
  }

  handleUploadPhotos (files) {

    const imageFiles = files.imageFiles;
    if (imageFiles) {
      imageFiles.map( async (file) => {
        //Get secure url from our server
        const { url } = await fetch('/s3url').then (res => res.json());
        //Post the image directly to s3 bucket
        await fetch (url, {
          method: 'PUT',
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          body: file
        });

        const imageURL = url.split('?')[0];
        this.state.photos.push({'data_url': imageURL});
      });
    }
    this.changeToNext();
  }

  handleSelectLocation (address, latLng) {
    this.setState ({ address: address, latLng: latLng });
  }

  handlePost (e) {
    //axios post request
    const date = e.target.value.split(',');
    const dateFrom = moment(date[0]).toISOString();
    const dateTo = moment(date[1]).toISOString();
    const photosArr = [];

    this.state.photos.map((photo) => {
      photosArr.push(photo['data_url']);
    });

    if ( photosArr.length === this.state.photos.length) {
      this.setState({
        availableFrom: dateFrom,
        availableTo: dateTo,
      }, () => {
        const { userId, title, category, brand, model, itemDescription, price, nameYourOwnPrice, minimunAcceptedPrice, availableFrom, availableTo, address, latLng } = this.state;
        const bodyParams = { userId, title, category, brand, model, itemDescription, price, nameYourOwnPrice, minimunAcceptedPrice, availableFrom, availableTo, address, latLng, photosArr };
        axios.post('/postItem', bodyParams)
          .then((response) => { this.changeToNext(); })
          .catch((error) => { alert('We are unable to complete your request, please try again later!'); });
      });
    }
  }

  render () {
    const { step } = this.state;
    const { userId, title, category, brand, model, itemDescription, price, nameYourOwnPrice, minimunAcceptedPrice, availableFrom, availableTo, photos, address, latLng } = this.state;
    const values = { userId, title, category, brand, model, itemDescription, price, nameYourOwnPrice, minimunAcceptedPrice, availableFrom, availableTo, photos, address, latLng };

    switch (step) {
    case 1:
      return (
        <Step1
          changeToNext={this.changeToNext}
          handleChange={this.handleChange}
          handleUploadPhotos={this.handleUploadPhotos}
          updateUserId={this.updateUserId}
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
          handleNYOP={this.handleNYOP}
          handleChange={this.handleChange}
          values={values}
        />
      );
    case 4:
      return (
        <Step4
          changeToPrevious={this.changeToPrevious}
          changeToNext={this.changeToNext}
          handleSelectLocation={this.handleSelectLocation}
          values={values}
        />
      );
    case 5:
      return (
        <Step5
          changeToPrevious={this.changeToPrevious}
          handleChange={this.handleChange}
          handlePost={this.handlePost}
          values={values}
        />
      );
    case 6:
      return (
        <ConfirmationPage
          reset={this.reset}
        />
      );
    default:
      return (
        <div className="mx-auto" style={{padding: '5em'}}>
          <h5 className="text-center">Post an item for rent in 5 easy steps</h5>
          <br/>
          <div className="d-grid gap-2 d-md-flex justify-content-md-center">
            <Button type="submit" onClick={this.changeToNext}>Let's GO</Button>
          </div>
        </div>
      );
    }
  }
}

export default PostItem;