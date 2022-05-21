/* This is where we can put our higher order components, components that share functionality across different features, etc. 

EXAMPLE FROM FEC BELOW:

import React from 'react';
import axios from 'axios';

// CHANGE REQUEST - Higher Order Component that handles click on element and sends metadata to Atelier Interactions API
const withInteractions = (WrappedComponent, widget) => {
  return function withInteractionsComponent(props) {

    const handleClickTracking = (event) => {
      event.preventDefault();

      // Getting the CSS Selectors and InnerText to send to Interactions API
      const split1 = event.target.outerHTML.split('>');
      const split2 = split1[0].split('<');
      const justSelectors = split2[1];
      const selectorsAndText = `Selectors: ${justSelectors}, Text: ${event.target.innerText}`;

      // console.log('selectorsAndText', selectorsAndText);
      // Time
      const currentDateAndTime = new Date().toString();

      const bodyParams = {
        element: selectorsAndText,
        widget: widget,
        time: currentDateAndTime
      };

      axios.post('/api/interactions', bodyParams)
        .then((response) => {
          // ***** We can remove this console.log once we've all incorporated the HOC into our widgets *****
          // console.log('SUCCESS sending click tracker interaction to API: ', response);
        })
        .catch((error) => {
          // console.log('ERROR sending click tracker interaction to API', error);
        });
    };

    return (
      <WrappedComponent interactions={handleClickTracking} {...props} />
    );
  };
};

export default withInteractions;
