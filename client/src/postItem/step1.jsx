import React, { useState } from 'react';
import ImageUploading from 'react-images-uploading';

import { ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import theme from '../utils/theme.js';

//Step1 includes title, and upload photo

const Step1 = (props) => {
  const [images, setImages] = React.useState([]);
  const maxNumber = 5;

  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };

  const onClick = async (images) => {
    const photos = await props.handleUploadPhotos(images);
  };

  return (
    <ThemeProvider theme={theme}>
        <React.Fragment>
          <h3>What do you want to rent out ?</h3>
          <Box
            component="form"
            sx={{'& .MuiTextField-root': { m: 1, width: '25ch' }}}
            autoComplete="off"
          >
            <TextField
              required
              label="Title"
              placeholder="Choose title for your post"
              onChange={props.handleChange('title')}
              defaultValue={props.values.title}
              margin="normal"
            />
          </Box>
          <br/>
          <h4>Upload Photos</h4>
          <ImageUploading
            multiple
            value={images}
            onChange={onChange}
            maxNumber={maxNumber}
            dataURLKey="data_url"
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
                    <img src={image['data_url']} alt="" width="100" />
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
          </ImageUploading>
          <Button
            onClick={() => onClick(images)}
          >Next</Button>
        </React.Fragment>
      </ThemeProvider>
  )
}

export default Step1;