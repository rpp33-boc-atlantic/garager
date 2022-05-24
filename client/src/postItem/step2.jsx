import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import theme from '../utils/theme.js';

//Step2 includes Category (drop list), brand, model, description

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
          <h5>Tell us a little more details...</h5>
          <TextField
            placeholder="Optional"
            lable="Brand"
            onChange={handleChange('brand')}
            defaultValue={values.brand}
            margin="normal"
            fullWidth
          />
          <TextField
            placeholder="Optional"
            lable="Model"
            onChange={handleChange('model')}
            defaultValue={values.model}
            margin="normal"
            fullWidth
          />
          <TextField
            placeholder="Items with a detailed description rent faster!"
            lable="Description"
            onChange={handleChange('description')}
            defaultValue={values.description}
            margin="normal"
            fullWidth
          />
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