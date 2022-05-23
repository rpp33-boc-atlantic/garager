//audio/visual, automotive, camping, decorations, events, fitness, gardening, hand tools,  power tools, ,, , , sports, recreational vehicles,

var owners = ['Ron Swanson', 'Leslie Knope', 'Russ Hanneman', 'Jack Barker', 'Michael Scott', 'Lorie Bream', 'Gavin Belson', 'Stanley Hudson', 'Kelly Kapoor', 'Tom Haverford', 'Donna Meagle', 'Creed Bratton', 'Bob Loblaw', 'Pierce Hawthorne'];
var transactions = {};
var fs = require('fs');


for (var i = 0; i < 10; i ++) {
  var transaction = {};

  transaction['id'] = i;
  transaction['productId'] = i;
  transaction['owner'] = owners[Math.floor(Math.random() * owners.length)];
  transaction['renter'] = owners[Math.floor(Math.random() * owners.length)];
  transaction['price'] = Math.floor((Math.random() * 100) + 4);
  transaction['startDate'] = new Date();
  transaction['dueDate'] = new Date(); // these dates need to be changed to different dates that arent too far apart from eachother
  transactions[i] = transaction;
}
console.log(transactions);

let data = JSON.stringify(transactions, null, 2);
fs.writeFileSync('transactions.json', data);