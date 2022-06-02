import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

//Step2 includes Category (drop list), brand, model, description
const categories = ['Automative', 'Household'];

const Step2 = (props) => {
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
    <React.Fragment>
      <h3>A little more details...</h3>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label htmlFor="category">Category</Form.Label>
          <select
            required
            onChange={handleChange('category')}
            defaultValue={values.category || ''}
          >
            <option>Choose...</option>
            <option defaultValue="1">Household</option>
            <option defaultValue="2">Automative</option>
          </select>
          <br/>
          <Form.Label htmlFor="brand">Brand</Form.Label>
          <Form.Control
            type="text" maxLength={50}
            id="brand"
            placeholder="Optional"
            onChange={handleChange('brand')} />

          <Form.Label htmlFor="model">Model</Form.Label>
          <Form.Control
            type="text" maxLength={50}
            id="brand"
            placeholder="Optional"
            onChange={handleChange('model')} />

          <Form.Label htmlFor="description">Description</Form.Label>
          <Form.Control
            required
            type="text" maxLength={500}
            id="brand"
            placeholder="Required"
            onChange={handleChange('itemDescription')} />
          <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Please provide a description for your item...
          </Form.Control.Feedback>
        </Form.Group>
        <Button type="button" onClick={changeToPrevious}>Back</Button>
        <Button type="submit">Next</Button>
      </Form>

    </React.Fragment>
  );
};

export default Step2;

//note: Back button is not sticky