const express = require('express');
const accountRouter = require('./routes/account.routes.js');
const session = require('express-session');

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

app.use('/messages', messagesRoutes);
app.use('/checkout', checkoutRoutes);

// All other routes must go above this function
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

module.exports = app;