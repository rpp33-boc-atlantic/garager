import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link, BrowserRouter } from 'react-router-dom';

const ConfirmationPage = (props) => {

  return (
    <div className="mx-auto" style={{padding: '5em'}}>
      <h3 className="text-center">Your Item has been posted! Have you set up Stripe? </h3>
      <div className="d-grid gap-2 d-md-flex justify-content-md-center">
        <Link to='../home' onClick={props.reset}>
          <Button className="flex-sm-fill text-sm-center"> Home </Button>
        </Link>
        <Link to='../my-listings' onClick={props.reset}>
          <Button className="flex-sm-fill text-sm-center"> My Listings </Button>
        </Link>
        <Link to='../Stripe-Account-Setup' onClick={props.reset}>
          <Button className="flex-sm-fill text-sm-center"> Stripe Account Setup </Button>
        </Link>
      </div>

    </div>
  );
};

export default ConfirmationPage;