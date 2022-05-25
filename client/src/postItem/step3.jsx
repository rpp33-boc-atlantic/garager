import React, { Component } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import theme from '../utils/theme.js';

//Step3 includes price, nyop, minimum accepted price

class Step3 extends Component {
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
      <ThemeProvider theme={theme}>
        <React.Fragment>
          <h3>How much do you want to rent it for?</h3>
          <Box
            component="form"
            sx={{'& .MuiTextField-root': { m: 1, width: '25ch' }}}
            autoComplete="off"
          >
            <br/>
            <InputLabel>Price</InputLabel>
            <TextField
              required
              lable="Price"
              onChange={handleChange('price')}
              defaultValue={values.price}
            />
          </Box>
          <InputLabel>Name Your Own Price</InputLabel>
          <FormGroup>
            <FormControlLabel control={
              <Switch
                onChange={handleChange('nameYourOwnPrice')}
                inputProps={{ 'aria-label': 'secondary checkbox' }}
                color={'primary'}
              />
            }/>
          </FormGroup>
          <Box
            component="form"
            sx={{'& .MuiTextField-root': { m: 1, width: '25ch' }}}
            autoComplete="off"
          >
            <br/>
            <InputLabel>Minimum Accepted Price</InputLabel>
            <TextField
              placeholder="Required"
              lable="Minimum Accepted Price"
              onChange={handleChange('minimunAcceptedPrice')}
              defaultValue={values.minimunAcceptedPrice}
            />
          </Box>
          <Button
            onClick={this.back}
          >Back</Button>
          <Button
            onClick={this.continue}
          >Next</Button>
        </React.Fragment>
      </ThemeProvider>
    );
  }
}

export default Step3;