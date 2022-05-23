const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('/test', (req, res) => {
  res.status(200).send({ message: 'it works!'});
});

module.exports = app;