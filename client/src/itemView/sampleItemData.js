import ladder1 from './samplePhotos/ladder1.jpeg';
import ladder2 from './samplePhotos/ladder2.jpeg';
import ladder3 from './samplePhotos/ladder3.jpeg';


var option1 = {
  itemID: 1234,
  name: 'Gorilla ladder',
  brand: 'Bri-Mar',
  brand: null,
  model: '3500 lb. Dual Acle',
  // model: '',
  description: 'The tallest ladder you\'ll ever rent!!! You\'ll use it all the time! Believe me, I am not lying!',
  availableFrom: '2022-06-01',
  availableTo: '2022-06-30',
  availability: true,
  price: 25,
  nameYourOwnPrice: true,
  minimumPrice: 20,
  images: [ladder1, ladder2, ladder3],
  rangesBooked: [['2022-06-03', '2022-06-07'], ['2022-06-15', '2022-06-20']],
  owner: {
    id: 6848,
    name: 'Tom Haverford',
    email: 'burtbee8@gmail.com',
    dateJoined: 'July 2022',
    address: 'Pawnee, Indiana'
  }
};


var option2 = {
  itemID: 1235,
  name: 'Glamorous Tent',
  brand: 'Patagonia',
  model: '89',
  description: 'Go glamping with this tent!',
  availability: true,
  price: 50,
  nameYourOwnPrice: false,
  minimumPrice: null,
  images: [ladder1],
  rangesBooked: [['2022-06-03', '2022-06-04'], ['2022-06-10', '2022-06-15']],
  owner: {
    name: 'Donna Meagle',
    dateJoined: 'March 2022',
    address: 'Pasadena, California'
  },
};

var option3 = {
  itemID: 1235,
  name: 'Glamorous Tent',
  brand: 'Patagonia',
  model: '89',
  description: 'Go glamping with this tent!',
  availability: false,
  price: 50,
  nameYourOwnPrice: false,
  minimumPrice: null,
  images: [],
  rangesBooked: [['2022-06-03', '2022-06-04'], ['2022-06-10', '2022-06-15']],
  owner: {
    name: 'Donna Meagle',
    dateJoined: 'February 2018',
    address: 'La Cañada Flintridge, California'
  },
};



export default { option1, option2, option3 };