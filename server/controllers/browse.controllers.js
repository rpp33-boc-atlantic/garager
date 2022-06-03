/* eslint-disable camelcase */
const { MAPS_API_KEY } = require('../../config.js');
const axios = require('axios');

module.exports = {
  location: {
    get: (req, res) => {
      axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
        params: {
          key: MAPS_API_KEY,
          components: req.query.components
        }
      })
        .then((response) => {
          let latLng = response.data.results[0].geometry.location;
          res.send(latLng);
        })
        .catch((error) => {
          res.status(500);
        });
    }
  }
};

