import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import theme from '../utils/theme.js';

//Step2 includes Category (drop list), brand, model, description
const categories = ['Automative', 'Household'];

class Step2 extends Component {
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
          <h3>A little more details...</h3>
          <Box
            component="form"
            sx={{'& .MuiTextField-root': { m: 1, width: '25ch' }}}
            autoComplete="off"
          >
            <InputLabel>Category</InputLabel>
            <Select
              required
              label="Category"
              onChange={handleChange('category')}
              value={values.category || ''}
            >
              <MenuItem value="Household">Household</MenuItem>
              <MenuItem value="Automotive">Automotive</MenuItem>
            </Select>
          </Box>
          <Box
            component="form"
            sx={{'& .MuiTextField-root': { m: 1, width: '25ch' }}}
            autoComplete="off"
          >
            <br/>
            <InputLabel>Brand</InputLabel>
            <TextField
              lable="Brand"
              placeholder="Optional"

              onChange={handleChange('brand')}
              defaultValue={values.brand}
              margin="normal"
            />
          </Box>
          <Box
            component="form"
            sx={{'& .MuiTextField-root': { m: 1, width: '25ch' }}}
            autoComplete="off"
          >
            <br/>
            <InputLabel>Model</InputLabel>
            <TextField
              placeholder="Optional"
              lable="Model"
              onChange={handleChange('model')}
              defaultValue={values.model}
              margin="normal"
            />
          </Box>
          <Box
            component="form"
            sx={{'& .MuiTextField-root': { m: 1, width: '25ch' }}}
            autoComplete="off"
          >
            <br/>
            <InputLabel>Description</InputLabel>
            <TextField
              placeholder="Items with a detailed description rent faster!"
              lable="Description"
              onChange={handleChange('description')}
              defaultValue={values.description}
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

export default Step2;