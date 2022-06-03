import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';

import Step1 from './Step1.jsx';
import Step2 from './Step2.jsx';
import Step3 from './Step3.jsx';
import Step4 from './Step4.jsx';
import Step5 from './Step5.jsx';
import ConfirmationPage from './ConfirmationPage.jsx';

class PostItem extends Component {
  constructor (props) {
    super (props);
    this.state = {
      step: 0,
      title: '',
      category: '',
      brand: '',
      model: '',
      itemDescription: '',
      price: 0,
      nameYourOwnPrice: false,
      minimunAcceptedPrice: 0,
      availableFrom: '',
      availableTo: '',
      photos: [],
      latLng: {},
      address: ''
    };
    this.changeToPrevious = this.changeToPrevious.bind(this);
    this.changeToNext = this.changeToNext.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleUploadPhotos = this.handleUploadPhotos.bind(this);
    this.handleSelectLocation = this.handleSelectLocation.bind(this);
    this.handlePost = this.handlePost.bind(this);
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

  handlePost (values) {
    //axios post request
    console.log('post data', values);
    // reset postData

  }

  render () {
    const { step } = this.state;
    const { title, category, brand, model, itemDescription, price, nameYourOwnPrice, minimunAcceptedPrice, availableFrom, availableTo, photos, address, latLng } = this.state;
    const values = { title, category, brand, model, itemDescription, price, nameYourOwnPrice, minimunAcceptedPrice, availableFrom, availableTo, photos, address, latLng };

    switch (step) {
    case 1:
      return (
        <Step1
          changeToNext={this.changeToNext}
          handleChange={this.handleChange}
          handleUploadPhotos={this.handleUploadPhotos}
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