
/******************************************************************* */
var fullNames = ['Wanda Maximoff', 'Ron Swanson', 'Leslie Knope', 'Russ Hanneman', 'Jack Barker', 'Michael Scott', 'Lorie Bream', 'Gavin Belson', 'Stanley Hudson', 'Kelly Kapoor', 'Tom Haverford', 'Donna Meagle', 'Creed Bratton', 'Bob Loblaw', 'Pierce Hawthorne'];
var emails = ['gmail', 'yahoo', 'iCloud', 'hotmail'];
var fs = require('fs');
var bool = [true, false];
var areacodes = [231, 248, 269, 313, 586, 616, 810, 906, 989, 734];
var createTransactions = require('./transactions.js');
var createItems = require('./items.js');

// Helper Functions
var random = function (min = 0, max) {

  var randomNum = Math.floor(Math.random() * max) + min;

  return randomNum;
};
var randomPhone = function() {
  var number = '';
  for (var i = 0; i < 7; i++) {
    number += Math.floor(Math.random() * 9);
    if ( i === 2) {
      number += '.';
    }
  }
  return number;
};


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
//this file creates a user for ever user entered above.
var createUsers = function (fullNames) {
  var users = [];
  for (var i = 0; i < fullNames.length; i ++) {

    var user = {};
    // set user_id
    user['user_id'] = i;
    // set firstName
    user['firstName'] = fullNames[i].split(' ')[0];
    // set lastName
    user['lastName'] = fullNames[i].split(' ')[1];
    // set email
    user['email'] = `${user['firstName']}.${user['lastName']}@${emails[Math.floor((Math.random() * emails.length))]}.com`;
    // set userPhoto
    user['userPhoto'] = '';
    // set phone number
    user['phone'] = `${areacodes[Math.floor(Math.random() * areacodes.length)]}.${randomPhone()}`;
    // set address
    user['address'] = randomAddress();
    // set dateJoined
    user['dateJoined'] = new Date();
    user['stripe_id'] = i;
    // user['IsFBAuthenticated'] = bool[Math.floor((Math.random() * 2))];

    users.push(user);

  }
  // console.log(users);
  let data = JSON.stringify(users, null, 2);
  fs.writeFileSync('client/src/data/dataFunctions/users.json', data);
};
/**********************************************************/


createUsers(fullNames);
// createItems(fullNames);
// createTransactions(fullNames);
