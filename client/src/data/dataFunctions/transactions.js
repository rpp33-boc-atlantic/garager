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

  var randomNum = Math.floor(Math.random() * (max - min + 1) + min);
  // console.log('min', min, ' max ', max, ' return ', randomNum);
  return randomNum;
};
module.exports = createTransactions = function (fullnames) {
  var transactions = [];

  var index = 0;
  for (var j = 0; j < 41; j++ ) {
    var cap = random(0, 10);
    var secondDate = random(-40, 0);
    console.log('cap', cap);

    for (var i = 0; i < cap; i ++) {
      var transaction = {};
      // set transaction_id
      transaction['transaction_id'] = index++;
      // set rate
      transaction['rate'] = Math.floor((Math.random() * 100) + 4);
      //set pickup date
      transaction['pickUpDate'] = new Date();
      var firstDate = random(secondDate, secondDate + 4);
      transaction['pickUpDate'].setDate(transaction['pickUpDate'].getDate() + firstDate);
      // console.log('itemId', j,);
      //set returnDate
      secondDate = random(firstDate + 1, firstDate + 7);
      // k = secondDate + 1;
      transaction['returnDate'] = new Date();
      transaction['returnDate'].setDate(transaction['returnDate'].getDate() + secondDate);
      // set owner_id
      var owner_id = Math.floor(Math.random() * fullnames.length);
      transaction['owner_id'] = owner_id;
      // set renter_id
      var renter_id = Math.floor(Math.random() * fullnames.length);
      transaction['renter_id'] = renter_id;
      //set item_id
      transaction['item_id'] = j;
      //set paymntintend_id
      transaction['paymentintent_id'] = '';
      //set refunded
      transaction['refunded'] = false;
      //set payment_status
      transaction['payment_status'] = '';
      transactions.push(transaction);
    }
  }
  // console.log(transactions.length);

  let data = JSON.stringify(transactions, null, 2);
  fs.writeFileSync('server/database/transactions.json', data);
};
createTransactions(fullnames);