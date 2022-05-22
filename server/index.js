const express = require('express');
let app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.get('/test', (req, res) => {
  res.status(200).send({ message: 'it works!'});
});

module.exports = app;