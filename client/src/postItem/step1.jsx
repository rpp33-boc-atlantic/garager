import React, { Component } from 'react';
import FileUpload from './FileUpload.jsx';

//Step1 includes title, and upload photo

class Step1 extends Component {
  constructor (props) {
    super (props);
    this.state = {
      imageFiles: []
    };
    this .updateUploadedFiles = this.updateUploadedFiles.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  updateUploadedFiles (files) {
    console.log('updateuploadfile is called');
    this.state.imageFiles.push(files);
    this.setState ({ imageFiles: this.state.imageFiles }, () => { console.log('state', this.state.imageFiles); });
  }


  handleSubmit (e) {
    e.preventDefault();

    console.log('success');
    // props.handleUploadPhotos(images);
  }

  render () {
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
        <form onSubmit={this.handleSubmit}>
          <FileUpload
            accept=".jpg,.png,.jpeg"
            label="Upload Image(s)"
            multiple
            updateFilesCb={this.updateUploadedFiles}
          />
          <button type="submit">Upload</button>
        </form>

        <button type="submit" className="btn" onClick={props.changeToNext}>Next</button>
      </React.Fragment>
    );
  }
}

export default Step1;