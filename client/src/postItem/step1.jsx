import React, { Component } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
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
              onChange={handleChange('title')}
              defaultValue={values.title}
              margin="normal"
            />
          </Box>
          <Button
            onClick={this.continue}
          >Next</Button>
        </React.Fragment>
      </ThemeProvider>
    );
  }
}

export default Step1;