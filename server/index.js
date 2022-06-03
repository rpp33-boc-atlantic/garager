const express = require('express');
const accountRouter = require('./routes/account.routes.js');
const config = require('../config.js');


const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const generateUploadURL = require('./s3.js');

const messagesRoutes = require('./routes/messages.routes.js');
const checkoutRoutes = require('./routes/checkout.routes.js');
const browseRoutes = require('./routes/browse.routes.js');

app.use('/account/', accountRouter);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static(path.join(__dirname, '../client')));

app.get('/s3url', async (req, res) => {
  const url = await generateUploadURL();
  res.send({url});
});

app.get('/test', (req, res) => {
  res.send('hi');
});

app.use('/messages', messagesRoutes);
app.use('/checkout', checkoutRoutes);
app.use('/browse', browseRoutes);

// All other routes must go above this function
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

module.exports = app;