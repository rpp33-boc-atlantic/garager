var fs = require('fs');

/*https://image.shutterstock.com/image-photo/tourist-tent-forest-camp-among-260nw-109609190.jpg', 'https://thumbs.dreamstime.com/z/chainsaw-3952407.jpg', 'https://images.unsplash.com/photo-1572111504021-40abd3479ddb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8bW91bnRhaW4lMjBiaWtlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=900&q=60', 'https://trek.scene7.com/is/image/TrekBicycleProducts/4up_v2_madone_9x11?$responsive-pjpg$&cache=on,on&wid=1920&hei=2346&fit=fit,1*/


var randomAddress = function () {
  var streetNames = ['Walnut', 'Skyline', 'Baker', 'Willow', 'Locust', 'MillPond', 'Catherine', 'Pine', 'Ellen', 'Emerson', 'Moore'];
  var roadType = ['Blvd', 'Rd', 'Dr', 'Street', 'Cir', 'Pkwy', 'Ct'];
  var address = '';
  var city = ['Marquette', 'Menominee', 'Lansing', 'Houghton'];
  var zip = Math.floor(Math.random() * 49971 ) + 48001;
  for (var i = 0; i < 4; i++) {
    address += Math.floor(Math.random() * 9);
    // if ( i === 2) {
    // }
  }
  address += ' ' + streetNames[random(0, streetNames.length)] + ' ' + roadType[random(0, roadType.length)] + ', ' + city[random(0, city.length)] + ', MI ' + zip;
  return address;
};
//audio/visual, automotive, camping, decorations, events, fitness, gardening, hand tools,  power tools, ,, , , sports, recreational vehicles,
var nouns = [
  ['Projector', 'Speaker', 'Amplifier', 'Lighting Equipment'],
  ['Car Jack', 'Auto Sander', 'Battery Charger and Booster Cables', 'Battery Isolators'],
  ['4 sleeping bags', '4 Person Tent', 'Camp Table + chairs', '2 person Hammock'],
  ['Carpet Cleaner', 'Window Washing Equipment', 'Dry Vac', 'Vacume'],
  ['Throw pillows', 'Inflatable Santa', 'Fall Wreath and Corn Stalks', '12 inch patterned rug'],
  ['Outdoor Wedding Chairs x50', 'Wedding Arch', 'Inflatable Bouncy House', 'Cornhole/ Horse Shoe Sets'],
  ['Treadmill', 'Rowing Machine', 'Weight Set', 'Rock Climbing Harness'],
  ['Wheebarrow', 'Rototiller', 'Set of Shovel, Pickaxe and Post Hole Digger', 'Garden Cart'],
  ['Fence Post Driver', 'Hex Wrench Set -all pieces there', 'Hammer', 'Axe Sharpening Set'],
  ['Circular Saw', 'Chainsaw', 'hedge trimmer', 'Weed Eater'],
  ['Electric bike', 'Mountain Bike', 'Skateboard', 'Moped'],
  ['XL Skis -fast', 'Child Size Skis', 'Snowboard', 'Ski/Snowboard Helment -Adult Size']];

var latlongs = [
  {
    lat: '47.121132',
    lng: '-88.569420'
  },
  {
    lat: '46.547581',
    lng: '-87.395592'
  },
  {
    lat: '46.233333',
    lng: '-86.35'
  }
];
var categories = ['Audio/Visual', 'Automotive', 'Camping', 'Cleaning', 'Decorations', 'Events', 'Fitness', 'Gardening',
  'Hand Tools', 'Power Tools', 'Recreational Vehicles', 'Sports Equipment'];

var brands = [
  ['Draper', 'Anthem', 'Severtson', 'Niles'],
  ['Mac Tools', 'Snap-On', 'Proto', 'Craftsman'],
  ['VSSL Gear', 'Power Practical', 'Marmot' ],
  ['Oreck', 'Mr. Clean', 'Clarke', 'Bissel'],
  ['Ikea', 'Urban Outfitters', 'World Market', 'Target'],
  ['EzJump', 'Oriental Trading Company', 'Good Fun LLC', 'Weber'],
  ['Total Gym FIT', 'NordicTrack', 'ProForm', 'Octane'],
  ['Bionic', 'Bond', 'CobraHead', 'Corona'],
  ['Craftsman', 'Klein', 'Black & Decker', 'DeWalt'],
  ['Bosch', 'Stanley', 'Kobalt', 'Makita'],
  ['Trek', 'Specialized', 'Cannondale', 'DiamondBack'],
  ['Fischer', 'Armada', 'Line', 'Volkl']
];
var condition = ['excellent', 'used', 'good', 'great', 'usable', 'perfect'];
var owners = ['Wanda Maximoff', 'Ron Swanson', 'Leslie Knope', 'Russ Hanneman', 'Jack Barker', 'Michael Scott', 'Lorie Bream', 'Gavin Belson', 'Stanley Hudson', 'Kelly Kapoor', 'Tom Haverford', 'Donna Meagle', 'Creed Bratton', 'Bob Loblaw', 'Pierce Hawthorne'];
var bool = [false, true];
var random = function (min = 0, max) {
  var randomNum = Math.floor(Math.random() * (max - min) + min);
  return randomNum;
};

var status = ['unavailable', 'available'];
module.exports = createItems = function (owners) {
  var gear = [];

  //iterate and create i random items.
  for (var i = 0; i < 38; i ++) {
    var item = {};
    var conditionIndex = Math.floor(random(0, condition.length));
    var categoryNum = Math.floor(random(0, categories.length));
    var oneToFour = Math.floor((Math.random() * 4));
    // set item_id
    item['item_id'] = i;
    // set user_id
    item['user_id'] = Math.floor(Math.random() * owners.length);
    // set title
    console.log('cat', categoryNum);
    var brand = brands[categoryNum][random(0, 4)];
    item['title'] = brand + ' ' + nouns[categoryNum][oneToFour];
    // set category
    item['category'] = categories[categoryNum];
    // set brand
    item['brand'] = brand;
    // set model
    item['model'] = '';
    // itemDescription
    item['itemDescription'] = nouns[categoryNum][oneToFour] + ' -In ' + condition[conditionIndex] + ' condition';
    // set price
    item['price'] = Math.floor((Math.random() * 100) + 4);
    // set nyop
    item['nyop'] = bool[random(0, 2)];
    // set minimum price
    item['min_price'] = Math.floor((Math.random() * item['price'] * .75) + 2);
    // set avaliableFrom
    item['availableFrom'] = new Date();
    var firstDate = random(-30, 0);
    item['availableFrom'].setDate(item['availableFrom'].getDate() + firstDate);


    var secondDate = random(firstDate + 30, firstDate + 90);
    item['availableTo'] = new Date();
    item['availableTo'].setDate(item['availableTo'].getDate() + secondDate);
    item['address'] = randomAddress();
    item['latLng'] = latlongs[random(0, latlongs.length)];
    item['photos'] = [''];
    // item['timesRented'] = Math.floor(Math.random() * 10);
    gear.push(item);


  }
  console.log('>', gear);

  let data = JSON.stringify(gear, null, 2);
  fs.writeFileSync('client/src/data/dataFunctions/items.json', data);

};

createItems(owners);
