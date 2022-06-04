const express = require('express');
const session = require('express-session');
require('./database/database.js');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const generateUploadURL = require('./s3.js');
const accountRouter = require('./routes/account.routes.js');
const messagesRoutes = require('./routes/messages.routes.js');
const checkoutRoutes = require('./routes/checkout.routes.js');
const browseRoutes = require('./routes/browse.routes.js');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../client')));

// session needed for creating stripe accounts
app.use(
  session({
    secret: 'atlantic BOC',
    resave: false,
    saveUninitialized: true,
  })
);

app.get('/s3url', async (req, res) => {
  const url = await generateUploadURL();
  res.send({url});
});

app.get('/test', (req, res) => {
  res.send('hi');
});

// ROUTES SETUP
app.use('/account/', accountRouter);
app.use('/messages', messagesRoutes);
app.use('/checkout', checkoutRoutes);
app.use('/browse', browseRoutes);

// All other routes must go above this function
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

module.exports = app;