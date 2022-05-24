const express = require('express');
const accountRouter = require('./routes/account.routes.js');
let app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use('/account/',accountRouter);

app.get('/test', (req, res) => {
  res.status(200).send({ message: 'it works!'});
});


module.exports = app;