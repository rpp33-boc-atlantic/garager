import React, { Component } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import theme from '../utils/theme.js';

//step5 includes time availability

class Step5 extends Component {
  constructor (props) {
    super (props);
    this.submit = this.submit.bind(this);
    this.back = this.back.bind(this);
  }

  submit (input) {
    return (e) => {
      e.preventDefault();
      this.props.handleSubmit(input);
    };
  }

  back (e) {
    e.preventDefault();
    this.props.changeToPrevious();
  }

  render () {
    const { values, handleChange } = this.props;
    return (
      <React.Fragment>
        <form>
          <TextField
            id="date"
            label="Available From"
            type="date"
            onChange={handleChange('availableFrom')}
            defaultValue={values.availableFrom || ''}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </form>
        <br/>
        <form>
          <TextField
            id="date"
            label="Available From"
            type="date"
            onChange={handleChange('availableTo')}
            defaultValue={values.availableTo || ''}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </form>
        <Button
          onClick={this.back}
        >Back</Button>
        <Button
          onClick={this.submit(values)}
        >Finish</Button>
      </React.Fragment>
    );
  }
}

export default Step5;

