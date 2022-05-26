import React, { Component } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import theme from '../utils/theme.js';

//Step4 includes pickup location

class Step4 extends Component {
  constructor (props) {
    super (props);
    this.continue = this.continue.bind(this);
    this.back = this.back.bind(this);
  }

  continue (e) {
    e.preventDefault();
    this.props.changeToNext();
  }

  back (e) {
    e.preventDefault();
    this.props.changeToPrevious();
  }

  render () {
    const { values, handleChange } = this.props;
    return (
      <MuiThemeProvider theme={theme}>
        <React.Fragment>
          <h3>Where can I pick up your item?</h3>
          <Box
            component="form"
            sx={{'& .MuiTextField-root': { m: 1, width: '25ch' }}}
            autoComplete="off"
          >
            <br/>
            <InputLabel>Pick Up Location</InputLabel>
            <TextField
              placeholder="Required"
              lable="Pick Up Location"
              onChange={handleChange('pickUpLocation')}
              defaultValue={values.pickUpLocation}
              margin="normal"
            />
          </Box>
          <Button
            onClick={this.back}
          >Back</Button>
          <Button
            onClick={this.continue}
          >Next</Button>
        </React.Fragment>
      </MuiThemeProvider>
    );
  }
}

export default Step4;