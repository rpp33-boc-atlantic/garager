import React, { useState, useEffect } from 'react';
import FileUpload from './FileUpload.jsx';

//Step1 includes title, and upload photo

const Step1 = (props) => {

  const [images, setImages] = React.useState({ imageFiles: [] });

  const updateUploadedFiles = (files) => {
    setImages({ ...images, imageFiles: files }, ()=> { console.log(images); });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.handleUploadPhotos(images);

  };

  return (
    <React.Fragment>
      <h3>What do you want to rent out ?</h3>
      <form>
        <div className="form-row">
          <label htmlFor="title">Title</label>
          <input type="text" className="form-control" id="inputTitle" placeholder="Choose title for your post..." onChange={props.handleChange('title')} />
        </div>
      </form>
      <h4>Upload Photos</h4>
      <form>
        <FileUpload
          accept=".jpg,.png,.jpeg"
          label="Upload Image(s)"
          multiple
          updateFilesCb={updateUploadedFiles}
        />
      </form>

      <button type="submit" className="btn" onClick={handleSubmit}>Next</button>
    </React.Fragment>
  );
};

export default Step1;