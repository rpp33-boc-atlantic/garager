//audio/visual, automotive, camping, decorations, events, fitness, gardening, hand tools,  power tools, ,, , , sports, recreational vehicles,

var owners = ['Ron Swanson', 'Leslie Knope', 'Russ Hanneman', 'Jack Barker', 'Michael Scott', 'Lorie Bream', 'Gavin Belson', 'Stanley Hudson', 'Kelly Kapoor', 'Tom Haverford', 'Donna Meagle', 'Creed Bratton', 'Bob Loblaw', 'Pierce Hawthorne'];
var transactions = {};
var fs = require('fs');


for (var i = 0; i < 10; i ++) {
  var item = {};

  item['id'] = i;
  item['productId'] = i;
  item['owner'] = owners[Math.floor(Math.random() * owners.length)];
  item['renter'] = owners[Math.floor(Math.random() * owners.length)];
  item['price'] = Math.floor((Math.random() * 100) + 4);
  item['startDate'] = new Date();
  item['dueDate'] = new Date();
  transactions[i] = item;
}
console.log(transactions);

let data = JSON.stringify(transactions, null, 2);
fs.writeFileSync('transactions.json', data);