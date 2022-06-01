const axios = require('axios');
const config = require('../../config.js');

module.exports = {
  latLng: {
    get: (zipCode) => {
      return axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
        params: {
          key: config.MAPS_API_KEY,
          components: `postal_code:${zipCode}`,
        }
      })
        .then((response) => {
          let latLng = response.data.results[0].geometry.location;
          return latLng;
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
};