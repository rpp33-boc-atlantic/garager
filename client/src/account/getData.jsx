
const axios = require('axios');

var getData = async (id, url) => {

  try {
    let data = await axios.get(`${url}`, {
      params: {
        id: id
      }
    });
    console.log('getData:error1 ', error);
    return data.data;
  } catch (error) {
    console.log('getData:error ', error);
    throw error;
  }

};
export default getData;