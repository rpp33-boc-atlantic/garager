const axios = require('axios');

module.exports = {
  latLng: {
    get: (zipCode) => {
      return axios.get('/location', {
        params: {
          components: `postal_code:${zipCode}`,
        }
      })
        .then((response) => {
          let latLng = response.data;
          return latLng;
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
};