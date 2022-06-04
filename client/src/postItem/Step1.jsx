import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import FileUpload from './FileUpload.jsx';

//Step1 includes title, and upload photo

const Step1 = (props) => {

  const [images, setImages] = React.useState({ imageFiles: [] });

  const updateUploadedFiles = (files) => {
    setImages({ ...images, imageFiles: files }, ()=> { console.log(images); });
  };
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
      props.handleUploadPhotos(images);
    }

  };

  return (
    <div className="mx-auto" style={{padding: '5em'}}>
      <h3>What do you want to rent out ?</h3>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label htmlFor="title">Title</Form.Label>
          <Form.Control
            required
            type="text" maxLength={50}
            id="inputTitle"
            placeholder="Required"
            onChange={props.handleChange('title')} />
          <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Please provide a title for your post...
          </Form.Control.Feedback>
        </Form.Group>
        <br/>
        <Form.Group>
          <FileUpload
            accept=".jpg,.png,.jpeg"
            label="Upload Image(s)"
            multiple
            updateFilesCb={updateUploadedFiles}
          />
        </Form.Group>
        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
          <Button type="submit">Next</Button>
        </div>
      </Form>
    </div>
  );
};

export default Step1;