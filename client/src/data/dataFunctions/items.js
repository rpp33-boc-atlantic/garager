var fs = require('fs');

//audio/visual, automotive, camping, decorations, events, fitness, gardening, hand tools,  power tools, ,, , , sports, recreational vehicles,
var nouns = [
  ['Projector', 'Speaker', 'Amplifier', 'Lighting Equipment'],
  ['Car Jack', 'Auto Sander', 'Battery Charger and Booster Cables', 'Battery Isolators'],
  ['boat', 'canoe', 'motor boat', 'life jackets'],
  ['4 sleeping bags', '4 Person Tent', 'Camp Table + chairs', '2 person Hammock'],
  ['Carpet Cleaner', 'Window Washing Equipment', 'Dry Vac', 'Vacume'],
  ['Throw pillows', 'Inflatable Santa', 'Fall Wreath and Corn Stalks', '12 inch patterned rug'],
  ['Outdoor Wedding Chairs x50', 'Wedding Arch', 'Inflatable Bouncy House', 'Cornhole/ Horse Shoe Sets'],
  ['Treadmill', 'Rowing Machine', 'Weight Set', 'Rock Climbing Harness'],
  ['Wheebarrow', 'Rototiller', 'Set of Shovel, Pickaxe and Post Hole Digger', 'Garden Cart'],
  ['Fence Post Driver', 'Hex Wrench Set -all pieces there', 'hammer', 'Axe Sharpening Set'],
  ['Circular Saw', 'ChainSaw', 'Hedge trimmer', 'Weed Eater'],
  ['Painting trays and rollers', 'small cement mixer', 'Paint mixer for use with cordless drill', 'Electrical Current Detector'],
  ['Electric bike', 'Mountain Bike', 'Skateboard', 'Moped'],
  ['XL Skis -fast', 'child size Skis', 'Snowboard', 'Ski/Snowboard Helment -Adult Size']];

var categories = ['audio/visual', 'automotive', 'boating', 'camping', 'cleaning', 'decorations', 'events', 'fitness', 'gardening',
  'hand tools', 'power tools',
  'home hepair', 'recreational vehicles', 'sports'];

var brands = [
  ['Draper', 'Anthem', 'Severtson', 'Niles'],
  ['Mac Tools', 'Snap-On', 'Proto', 'Craftsman'],
  ['HARRIS', 'Sea Ray', 'MasterCraft', 'Bertram'],
  ['VSSL Gear', 'Power Practical', 'Marmot' ],
  ['Oreck', 'Mr. Clean', 'Clarke', 'Bissel'],
  ['Ikea', 'Urban Outfitters', 'World Market', 'Target'],
  ['EzJump', 'Oriental Trading Company', 'Good Fun LLC', 'Weber'],
  ['Total Gym FIT', 'NordicTrack', 'ProForm', 'Octane'],
  ['Bionic', 'Bond', 'CobraHead', 'Corona'],
  ['Craftsman', 'Klein', 'Black & Decker', 'DeWalt'],
  ['Bosch', 'Stanley', 'Kobalt', 'Makita'],
  ['Wooster', 'Purdy', 'Scotch', 'Valspar'],
  ['Trek', 'Specialized', 'Cannondale', 'DiamondBack'],
  ['Fischer', 'Armada', 'Line', 'Volkl']];

var condition = ['excellent', 'used', 'good', 'great', 'usable'];
var owners = ['Ron Swanson', 'Leslie Knope', 'Russ Hanneman', 'Jack Barker', 'Michael Scott', 'Lorie Bream', 'Gavin Belson', 'Stanley Hudson', 'Kelly Kapoor', 'Tom Haverford', 'Donna Meagle', 'Creed Bratton', 'Bob Loblaw', 'Pierce Hawthorne'];
var status = ['unavailable', 'available'];
var gear = {};

//iterate and create i random items.
for (var i = 0; i < 40; i ++) {
  var item = {};

  var conditionIndex = Math.floor((Math.random() * condition.length));
  var categoryNum = Math.floor((Math.random() * categories.length));
  var oneToFour = Math.floor((Math.random() * 4));

  item['id'] = i;
  item['description'] = nouns[categoryNum][oneToFour] + ' -In ' + condition[conditionIndex] + ' condition';
  item['price'] = Math.floor((Math.random() * 100) + 4);
  item['category'] = categories[categoryNum];
  item['brand'] = brands[categoryNum][Math.floor(Math.random() * 4)];
  item['timesRented'] = Math.floor(Math.random() * 10);
  item['owner'] = owners[Math.floor(Math.random() * owners.length)];
  item['status'] = status[Math.floor(Math.random() * status.length)];
  item['model'] = '';
  item['name'] = item['brand'] + ' ' + nouns[categoryNum][oneToFour];
  gear[item['id']] = item;


}
console.log(gear);

let data = JSON.stringify(gear, null, 2);
fs.writeFileSync('items.json', data);