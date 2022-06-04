/* eslint-disable camelcase */
const { MAPS_API_KEY, THESAURUS_API_KEY } = require('../../config.js');
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
          res.status(500).send(error);
        });
    }
  },
  relatedWords: {
    get: (req, res) => {
      axios.get(`https://api.datamuse.com/words?rel_gen=${req.query.keyword}&max=10`)
        .then((response) => {
          let relatedWords = response.data;
          res.send(relatedWords);
        })
        .catch((error) => {
          res.status(500).send(error);
        });
    }
  }
};

