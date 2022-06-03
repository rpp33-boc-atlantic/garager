import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';

const ConfirmationPage = (props) => {

  return (
    <div className="mx-auto" style={{padding: '5em'}}>
      <h3 className="text-center">Your Item has been posted! Have you set up Stripe? </h3>
      <div className="d-grid gap-2 d-md-flex justify-content-md-center">
        <a className="flex-sm-fill text-sm-center nav-link active" href="#" onClick={props.reset}>My Listings</a>
        <a className="flex-sm-fill text-sm-center nav-link" href="#" onClick={props.reset}>Set Up Strip</a>
      </div>
    </div>
  );
};

export default ConfirmationPage;