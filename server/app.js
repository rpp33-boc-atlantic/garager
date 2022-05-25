const app = require('./index.js');
const port = require('../config.js').port;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});