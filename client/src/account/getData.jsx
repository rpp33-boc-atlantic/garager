
const axios = require('axios');

var getData = async (id, url) => {

  try {
    let data = await axios.get(`${url}`, {
      params: {
        id: id
      }
    });
   
    return data.data;
  } catch (error) {

    throw error;
  }

};
export default getData;