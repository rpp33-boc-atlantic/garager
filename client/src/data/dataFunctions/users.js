


var names = ['Ron Swanson', 'Leslie Knope', 'Russ Hanneman', 'Jack Barker', 'Michael Scott', 'Lorie Bream', 'Gavin Belson', 'Stanley Hudson', 'Kelly Kapoor', 'Tom Haverford', 'Donna Meagle', 'Creed Bratton', 'Bob Loblaw', 'Pierce Hawthorne'];
var emails = ['gmail', 'yahoo', 'iCloud', 'hotmail'];
var users = {};
var fs = require('fs');
var bool = [true, false];

//this file creates a user for ever user entered above.
for (var i = 0; i < names.length; i ++) {
  var item = {};

  item['id'] = i;
  item['phoneNumber'] = `(${444})${342}-${2334})`; // need to figureout better phone number
  item['Address'] = ''; // need to make a fake address bank
  item['name'] = names[i];
  item['IsFBAuthenticated'] = bool[Math.floor((Math.random() * 2))];
  item['joinedDate'] = new Date();
  console.log('user', item['name']);
  item['email'] = item['name'].replace(/ /g, '.') + `@${emails[Math.floor((Math.random() * emails.length))]}.com`;
  users[i] = item;
}
console.log(users);
let data = JSON.stringify(users, null, 2);
fs.writeFileSync('users.json', data);