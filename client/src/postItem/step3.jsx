import React, { useState } from 'react';
import { Form, Button, Overlay } from 'react-bootstrap';

//Step3 includes price, nyop, minimum accepted price

const Step3 = (props) => {
  const { values, handleChange, changeToNext, changeToPrevious } = props;

  return (
    <div className="mx-auto" style={{padding: '5em'}}>
      <h3>How much do you want to rent it for?</h3>
      <Form>
        <Form.Group>
          <Form.Label htmlFor="price">Rate per day</Form.Label>
          <Form.Control required type="text" className="form-control" id="price" placeholder="Required" onChange={handleChange('price')} value={values.price}/>
        </Form.Group>
        <br/>
        <Form.Group>
          <Form.Label htmlFor="nyop">Name your own price? </Form.Label>
          <div className="form-check form-switch">
            <Form.Control className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" onChange={handleChange('nameYourOwnPrice')} defaultValue={values.nameYourOwnPrice}/>
          </div>
        </Form.Group>

        {values.nameYourOwnPrice === true
          ?
          <Form.Group>
            <Form.Label htmlFor="price">Minimum accepted price</Form.Label>
            <Form.Control required type="text" className="form-control" id="minimunAcceptedPrice" placeholder="Set the lowest price you will accept..." onChange={handleChange('minimunAcceptedPrice')} value={values.minimunAcceptedPrice}/>
          </Form.Group>
          :
          <></>
        }
        <br/>
        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
          <Button type="button" onClick={changeToPrevious}>Back</Button>
          <Button type="submit" onClick={changeToNext}>Next</Button>
        </div>
      </Form>
    </div>
  );
};

export default Step3;