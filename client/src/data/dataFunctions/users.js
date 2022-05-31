

var names = ['Ron Swanson', 'Leslie Knope', 'Russ Hanneman', 'Jack Barker', 'Michael Scott', 'Lorie Bream', 'Gavin Belson', 'Stanley Hudson', 'Kelly Kapoor', 'Tom Haverford', 'Donna Meagle', 'Creed Bratton', 'Bob Loblaw', 'Pierce Hawthorne'];
var emails = ['gmail', 'yahoo', 'iCloud', 'hotmail'];
var users = {};
var fs = require('fs');
var bool = [true, false];
var areacodes = [231, 248, 269, 313, 586, 616, 810, 906, 989, 734];
var randomPhone = function() {
  var number = '';
  for (var i = 0; i < 7; i++) {
    number += Math.floor(Math.random() * 9);
    if ( i === 2) {
      number += '-';
    }
  }
  return number;
};
var random = function (min = 0, max) {

  var randomNum = Math.floor(Math.random() * max) + min;
  console.log('randomNum', randomNum);
  return randomNum;
};
var randomAddress = function () {
  var names = ['Walnut', 'Skyline', 'Baker', 'Willow', 'Locust', 'MillPond', 'Catherine', 'Pine', 'Ellen', 'Emerson', 'Moore'];
  var roadType = ['Blvd', 'Rd', 'Dr', 'Street', 'Cir', 'Pkwy', 'Ct'];
  var address = '';
  for (var i = 0; i < 4; i++) {
    address += Math.floor(Math.random() * 5);
    if ( i === 2) {
    }
  }
  address += ' ' + names[random(0, names.length)] + ' ' + roadType[random(0, roadType.length)];
  return address;
};
//this file creates a user for ever user entered above.
for (var i = 0; i < names.length; i ++) {
  var user = {};

  //user[']
  //user['zipcode']
  //user['city']
  user['zipcode'] = Math.floor(Math.random() * 49971 ) + 48001;
  user['state'] = 'MI';
  user['id'] = i;
  user['phoneNumber'] = `(${areacodes[Math.floor(Math.random() * areacodes.length)]})${randomPhone()}`; // need to figureout better phone number
  user['Address'] = randomAddress(); // need to make a fake address bank
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