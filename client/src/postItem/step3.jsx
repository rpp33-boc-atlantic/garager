import React, { useState } from 'react';
import { Form, Button, Overlay } from 'react-bootstrap';

//Step3 includes price, nyop, minimum accepted price

const Step3 = (props) => {
  const { values, handleChange, changeToNext, changeToPrevious } = props;
  const [validated, setValidated] = useState(false);

  const handleSubmit = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    setValidated(true);

    if (form.checkValidity() === true) {
      e.preventDefault();
      e.stopPropagation();
      changeToNext();
    }

  };

  return (
    <div className="mx-auto" style={{padding: '5em'}}>
      <h3>How much do you want to rent it for?</h3>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label htmlFor="price">Rate per day</Form.Label>
          <Form.Control required type="text" className="form-control" id="price" placeholder="Required" pattern="\d+(\.\d{2})?" onChange={handleChange('price')} value={values.price || ''}/>
          <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Please enter the rate in format 0.00
          </Form.Control.Feedback>
        </Form.Group>
        <br/>

        <h6 htmlFor="nyop">Name your own price? </h6>
        <div className="form-check form-switch">
          <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" onChange={handleChange('nameYourOwnPrice')} defaultValue={values.nameYourOwnPrice} />
        </div>

        {values.nameYourOwnPrice === true
          ?
          <Form.Group>
            <Form.Label htmlFor="price">Minimum accepted price</Form.Label>
            <Form.Control required type="text" className="form-control" id="minimunAcceptedPrice" placeholder="Set the lowest price you will accept..." pattern="\d+(\.\d{2})?" onChange={handleChange('minimunAcceptedPrice')} value={values.minimunAcceptedPrice}/>
            <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              Please enter the lowest rate you would approve in format 0.00
            </Form.Control.Feedback>
          </Form.Group>
          :
          <></>
        }
        <br/>
        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
          <Button type="button" onClick={changeToPrevious}>Back</Button>
          <Button type="submit">Next</Button>
        </div>
      </Form>
    </div>
  );
};

export default Step3;