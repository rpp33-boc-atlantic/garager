import ladder1 from './samplePhotos/ladder1.jpeg';
import ladder2 from './samplePhotos/ladder2.jpeg';
import ladder3 from './samplePhotos/ladder3.jpeg';


var option1 = {
  details: {
    item_id: '',
    title: '',
    brand: '',
    model: '',
    itemdescription: '',
    availablefrom: '2022-06-01',
    availableto: '2022-06-30',
    price: '',
    nyop: null,
    minimumPrice: '',
    // photos: [ladder1, ladder2, ladder3],
    photos: [],
    firstname: '',
    lastname: '',
    email: '',
    userphoto: null,
    datejoined: '',
    address: ''

  },
  // datesBooked: [{'json_build_array':['2022-06-05', '2022-06-07']}, {json_build_array: ['2022-06-15', '2022-06-20']}]
  datesBooked: []

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