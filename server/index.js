const express = require('express');
const axios = require('axios');
const accountRouter = require('./routes/account.routes.js');
const config = require('../config.js');


const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const generateUploadURL = require('./s3.js');

const messagesRoutes = require('./routes/messages.routes.js');
const checkoutRoutes = require('./routes/checkout.routes.js');

app.use('/account/', accountRouter);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static(path.join(__dirname, '../client')));

app.get('/s3url', async (req, res) => {
  const url = await generateUploadURL();
  res.send({url});
});

app.get('/location', (req, res) => {
  axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
    params: {
      key: config.MAPS_API_KEY,
      components: req.query.components
    }
  })
    .then((response) => {
      let latLng = response.data.results[0].geometry.location;
      res.send(latLng);
    })
    .catch((error) => {
      console.log(error);
    });
});

app.get('/test', (req, res) => {
  res.send('hi');
});

app.use('/messages', messagesRoutes);
app.use('/checkout', checkoutRoutes);

// All other routes must go above this function
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

module.exports = app;