import React, { Component } from 'react';
import PlacesAutocomplete, { geocodeByAddress, geocodeByPlaceId, getLatLng } from 'react-places-autocomplete';

//Step4 includes pickup location

class Step4 extends Component {
  constructor (props) {
    super (props);
    this.state = {
      address: '',
      latLng: {}
    };
    this.continue = this.continue.bind(this);
    this.back = this.back.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.validateZipcode = this.validateZipcode.bind(this);
    this.handleChangeInStep4 = this.handleChangeInStep4.bind(this);
  }

  continue (e) {
    e.preventDefault();
    this.props.changeToNext();
  }

  back (e) {
    e.preventDefault();
    this.props.changeToPrevious();
  }

  handleChangeInStep4 (address) {
    this.setState({ address });
  }

  validateZipcode (zipcode) {
    if (zipcode === '20252') {
      return true;
    } else {
      if (zipcode.substring(0,2) === '09') {
        return false;
      } else {
        let first3digits = zipcode.substring(0,3);
        let regex = /^(?:001|00[6-9]|20[2-5]|340|96[2-8]|)$/;
        if (first3digits.match(regex)) {
          return false;
        } else {
          return true;
        }
      }
    }
  }

  handleSelect (address) {
    geocodeByAddress(address)
      .then((results) => {
        const zipcode = results[0].address_components[7].long_name;
        if (this.validateZipcode(zipcode)) {
          console.log('validation', this.validateZipcode(zipcode));
          getLatLng(results[0]);
        } else {
          alert('Restricted location. Please enter a different location...');
        }
      })
      .then(latLng => this.setState({ address: address, latLng: latLng}, () => { this.props.handleSelectLocation(address, latLng); }))
      .catch(error => console.error('Error', error));
  }


  render () {
    const { values, handleChange } = this.props;
    return (
      <React.Fragment>
        <h3>Where can I pick up your item?</h3>
        <h4>Pick Up Location</h4>
        <PlacesAutocomplete
          value={this.state.address}
          onChange={this.handleChangeInStep4}
          onSelect={this.handleSelect}
        >
          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
            <div>
              <input
                {...getInputProps({
                  placeholder: 'Search Places ...',
                  className: 'location-search-input',
                })}
              />
              <div className="autocomplete-dropdown-container">
                {loading && <div>Loading...</div>}
                {suggestions.map(suggestion => {
                  const className = suggestion.active
                    ? 'suggestion-item--active'
                    : 'suggestion-item';
                  // inline style for demonstration purpose
                  const style = suggestion.active
                    ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                    : { backgroundColor: '#ffffff', cursor: 'pointer' };
                  return (
                    <div
                      {...getSuggestionItemProps(suggestion, {
                        className,
                        style,
                      })}
                    >
                      <span>{suggestion.description}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </PlacesAutocomplete>
        <button
          type="submit" className="btn"
          onClick={this.back}
        >Back</button>
        <button
          type="submit" className="btn"
          onClick={this.continue}
        >Next</button>
      </React.Fragment>
    );
  }
}

export default Step4;

