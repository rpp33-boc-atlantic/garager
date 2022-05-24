import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import theme from '../utils/theme.js';

//Step1 includes title, and upload photo

class Step1 extends Component {
  constructor (props) {
    super (props);
    this.continue = this.continue.bind(this);
  }

  continue (e) {
    e.preventDefault();
    this.props.changeToNext();
  }

  render () {
    const { values, handleChange } = this.props;

    return (
      <MuiThemeProvider theme={theme}>
        <React.Fragment>
          <h5>What do you want to rent out ?</h5>
          <TextField
            placeholder="Choose title for your post"
            label="Title"
            onChange={handleChange('title')}
            defaultValue={values.title}
            margin="normal"
          />
          <Button
            onClick={this.continue}
          >Next</Button>
        </React.Fragment>
      </MuiThemeProvider>
    );
  }
}

export default Step1;