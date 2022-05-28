//audio/visual, automotive, camping, decorations, events, fitness, gardening, hand tools,  power tools, ,, , , sports, recreational vehicles,

var owners = ['Ron Swanson', 'Leslie Knope', 'Russ Hanneman', 'Jack Barker', 'Michael Scott', 'Lorie Bream', 'Gavin Belson', 'Stanley Hudson', 'Kelly Kapoor', 'Tom Haverford', 'Donna Meagle', 'Creed Bratton', 'Bob Loblaw', 'Pierce Hawthorne'];
var transactions = [];
var fs = require('fs');

const today = new Date();
const threedaysFromNow = new Date(today);
threedaysFromNow.setDate( threedaysFromNow.getDate() + 3);
console.log(today, threedaysFromNow);

var random = function (min = 0, max) {

  var randomNum = Math.floor(Math.random() * max) + min;
  console.log('randomNum', randomNum);
  return randomNum;
};


for (var i = 0; i < 10; i ++) {
  var transaction = {};

  transaction['id'] = i;
  transaction['productId'] = i;
  var ownerId = Math.floor(Math.random() * owners.length);
  transaction['ownerId'] = ownerId;
  transaction['ownerName'] = owners[ownerId];
  var renterId = Math.floor(Math.random() * owners.length);
  transaction['renterId'] = renterId;
  transaction['renterName'] = owners[renterId];
  transaction['price'] = Math.floor((Math.random() * 100) + 4);
  transaction['startDate'] = new Date();
  var firstDate = random(-10, 10);
  console.log('first', firstDate);
  transaction['startDate'].setDate(transaction['startDate'].getDate() + firstDate);
  var secondDate = random(firstDate + 5, firstDate);
  transaction['dueDate'] = new Date(); // these dates need to be changed to different dates that arent too far apart from eachother
  transaction['dueDate'].setDate(transaction['dueDate'].getDate() + secondDate);

  transactions.push(transaction);
}
console.log(transactions);

let data = JSON.stringify(transactions, null, 2);
fs.writeFileSync('transactions.json', data);