
const axios = require('axios');

var getData = async (id, url) => {

  return await axios.get(`${url}`, {
    params: {
      id: id
    }
  })
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log('error', error);
    });


};
export default getData;