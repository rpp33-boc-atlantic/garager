/* eslint-disable camelcase */
//audio/visual, automotive, camping, decorations, events, fitness, gardening, hand tools,  power tools, ,, , , sports, recreational vehicles,

var fullnames = ['Wanda Maximoff', 'Ron Swanson', 'Leslie Knope', 'Russ Hanneman', 'Jack Barker', 'Michael Scott', 'Lorie Bream', 'Gavin Belson', 'Stanley Hudson', 'Kelly Kapoor', 'Tom Haverford', 'Donna Meagle', 'Creed Bratton', 'Bob Loblaw', 'Pierce Hawthorne'];
var transactions = [];
var fs = require('fs');

// const today = new Date();
// const threedaysFromNow = new Date(today);
// threedaysFromNow.setDate( threedaysFromNow.getDate() + 3);
// console.log(today, threedaysFromNow);

var random = function (min = 0, max) {

  var randomNum = Math.floor(Math.random() * max) + min;
  return randomNum;
};
module.exports = createTransactions = function (fullnames) {
  var transactions = [];

  for (var i = 0; i < 100; i ++) {
    var transaction = {};
    // set transaction_id
    transaction['transaction_id'] = i;
    // set rate
    transaction['rate'] = Math.floor((Math.random() * 100) + 4);
    //set pickup date
    transaction['pickUpDate'] = new Date();
    var firstDate = random(-10, 30);
    // console.log('first', firstDate);
    transaction['pickUpDate'].setDate(transaction['pickUpDate'].getDate() + firstDate);
    //set dueDate
    var secondDate = random(firstDate + 5, firstDate);
    transaction['returnDate'] = new Date();
    transaction['returnDate'].setDate(transaction['returnDate'].getDate() + secondDate);
    // set owner_id
    var owner_id = Math.floor(Math.random() * fullnames.length);
    transaction['owner_id'] = owner_id;
    // set renter_id
    var renter_id = Math.floor(Math.random() * fullnames.length);
    transaction['renter_id'] = renter_id;
    //set item_id
    transaction['item_id'] = random(0, 20);
    transaction['paymentIntent_id'] = '';
    transaction['refunded'] = false;
    transaction['payment_status'] = '';

    // remove eventually
    // transaction['owner_name'] = fullnames[owner_id];
    // transaction['renterName'] = fullnames[renter_id];
    // transaction['itemName'] = 'x';

    transactions.push(transaction);
  }
  // console.log(transactions);

  let data = JSON.stringify(transactions, null, 2);
  fs.writeFileSync('/Users/jo/Desktop/RPP33_Repos/garager/server/database/transactions.json', data);
};

createTransactions(fullnames);