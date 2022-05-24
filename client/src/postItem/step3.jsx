import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
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
      <MuiThemeProvider theme={theme}>
        <React.Fragment>
          <AppBar title="How much do you want to rent it for?" />
          <TextField
            placeholder="Required"
            lable="Price"
            onChange={handleChange('price')}
            defaultValue={values.price}
            margin="normal"
          />
          <TextField
            placeholder="Required"
            lable="Minimum Accepted Price"
            onChange={handleChange('minimunAcceptedPrice')}
            defaultValue={values.minimunAcceptedPrice}
            margin="normal"
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

export default Step3;