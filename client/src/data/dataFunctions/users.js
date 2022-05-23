


var names = ['Ron Swanson', 'Leslie Knope', 'Russ Hanneman', 'Jack Barker', 'Michael Scott', 'Lorie Bream', 'Gavin Belson', 'Stanley Hudson', 'Kelly Kapoor', 'Tom Haverford', 'Donna Meagle', 'Creed Bratton', 'Bob Loblaw', 'Pierce Hawthorne'];
var emails = ['gmail', 'yahoo', 'iCloud', 'hotmail'];
var users = {};
var fs = require('fs');
var bool = [true, false];

//this file creates a user for ever user entered above.
for (var i = 0; i < names.length; i ++) {
  var user = {};

  //user[']
  //user['zipcode']
  //user['city']
  user['id'] = i;
  user['phoneNumber'] = `(${444})${342}-${2334})`; // need to figureout better phone number
  user['Address'] = ''; // need to make a fake address bank
  user['name'] = names[i];
  user['IsFBAuthenticated'] = bool[Math.floor((Math.random() * 2))];
  user['joinedDate'] = new Date();
  console.log('user', user['name']);
  user['email'] = user['name'].replace(/ /g, '.') + `@${emails[Math.floor((Math.random() * emails.length))]}.com`;
  users[i] = user;

}
console.log(users);
let data = JSON.stringify(users, null, 2);
fs.writeFileSync('users.json', data);