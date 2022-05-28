var option1 = {
  name: 'Gorilla ladder',
  details: {
    brand: 'Bri-Mar',
    model: '3500 lb. Dual Acle',
    description: 'The tallest ladder you\'ll ever rent!!! You\'ll use it all the time! Believe me, I am not lying!'
  },
  availability: true,
  formInfo: {
    price: 25,
    nameYourOwnPrice: true,
    minimumPrice: 20,
  },
  images: [],
  owner: {
    name: 'Tom Haverford',
    dateJoined: 'July 2022',
    address: 'Glendale, California'
  },
};

var option2 = {
  name: 'Glamorous Tent',
  details: {
    brand: 'Patagonia',
    model: '89',
    description: 'Go glamping with this tent!'
  },
  availability: true,
  formInfo: {
    price: 50,
    nameYourOwnPrice: false,
    minimumPrice: null,
  },
  images: [],
  owner: {
    name: 'Donna Meagle',
    dateJoined: 'March 2022',
    address: 'Pasadena, California'
  },
};

var option3 = {
  name: 'Glamorous Tent',
  details: {
    brand: 'Patagonia',
    model: '89',
    description: 'Go glamping with this tent!'
  },
  availability: false,
  formInfo: {
    price: 50,
    nameYourOwnPrice: false,
    minimumPrice: null,
  },
  images: [],
  owner: {
    name: 'Donna Meagle',
    dateJoined: 'February 2018',
    address: 'La Cañada Flintridge, California'
  },
};



export default { option1, option2, option3 };