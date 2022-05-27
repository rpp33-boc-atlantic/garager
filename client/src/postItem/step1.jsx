import React, { useState } from 'react';
import ImageUploading from 'react-images-uploading';

//Step1 includes title, and upload photo

const Step1 = (props) => {
  const [images, setImages] = React.useState([]);
  const maxNumber = 5;

  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
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
      <form id="imageForm">
        <input id="imageInput" type="file" accept="image/*" />
        <button type="submit" onClick={props.handleUploadPhotos}>Upload</button>
      </form>
      {/* <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
        id="imageForm"
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          // write your building UI
          <div className="upload__image-wrapper">
            <button
              style={isDragging ? { color: 'red' } : undefined}
              onClick={onImageUpload}
              {...dragProps}
            >
              Click or Drop here
            </button>
            &nbsp;
            <button onClick={onImageRemoveAll}>Remove all images</button>
            {imageList.map((image, index) => (
              <div key={index} className="image-item">
                <img src={image['data_url']} alt="" width="100" id="imageInput" />
                <div className="image-item__btn-wrapper">
                  <br/>
                  <button onClick={() => onImageUpdate(index)}>Update</button>
                  <button onClick={() => onImageRemove(index)}>Remove</button>
                  <br/>
                </div>
              </div>
            ))}
          </div>
        )}
      </ImageUploading> */}

      <button type="submit" className="btn" onClick={props.changeToNext}>Next</button>
    </React.Fragment>
  );
};

export default Step1;