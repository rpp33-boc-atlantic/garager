import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import PlacesAutocomplete, { geocodeByAddress, geocodeByPlaceId, getLatLng } from 'react-places-autocomplete';

//Step4 includes pickup location

const Step4 = (props) => {
  const { values, handleChange, handleSelectLocation, changeToNext, changeToPrevious } = props;
  const [ validated, setValidated ] = useState(false);
  const [ address, setAddress ] = useState('');
  const [ latLng, setlatLng ] = useState();

  const onError = (status, clearSuggestions) => {
    console.log('Google Maps API returned error with status: ', status);
    setAddress('');
    clearSuggestions();
  };

  const handleSubmit = (e) => {

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    setValidated(true);

    if (form.checkValidity() === true) {
      e.preventDefault();
      e.stopPropagation();
      changeToNext();
    }
  };

  const validateZipcode = (zipcode) => {
    if (zipcode === '20252') {
      return true;
    } else {
      if (zipcode.substring(0, 2) === '09') {
        return false;
      } else {
        let first3digits = zipcode.substring(0, 3);
        let regex = /^(?:001|00[6-9]|20[2-5]|340|96[2-8]|)$/;
        if (first3digits.match(regex)) {
          return false;
        } else {
          return true;
        }
      }
    }
  };

  const onChange = (input) => {
    setAddress(input);
  };

  const handleSelect = (selectedAddress) => {
    setAddress(selectedAddress);
    geocodeByAddress(selectedAddress)
      .then((results) => {
        const zipcodeIndex = results[0].address_components.length - 1;
        const zipcode = results[0].address_components[zipcodeIndex].long_name;
        if (validateZipcode(zipcode)) {
          getLatLng(results[0])
            .then((latLng) => {
              setlatLng(latLng);
              handleSelectLocation(selectedAddress, latLng);
            })
            .catch(error => console.error('Error', error));
        } else {
          setValidated(false);
        }
      })
      .catch(error => console.error('Error', error));
  };

  return (
    <div className="mx-auto" style={{padding: '5em'}}>
      <h3>Where can I pick up your item?</h3>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Pick Up Location</Form.Label>
          <PlacesAutocomplete
            value={address}
            onError={onError}
            onChange={onChange}
            onSelect={handleSelect}
          >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
              <div>
                <Form.Control
                  required
                  {...getInputProps({
                    placeholder: 'Search Places ...',
                    className: 'location-search-input',
                  })}
                />
                <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  Please provide a valid address...
                </Form.Control.Feedback>
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
          <br/>
          <div className="d-grid gap-2 d-md-flex justify-content-md-end">
            <Button type="button" onClick={changeToPrevious}>Back</Button>
            <Button type="submit">Next</Button>
          </div>
        </Form.Group>
      </Form>
    </div>
  );
};

export default Step4;

