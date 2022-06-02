const express = require('express');
require('./database/database.js');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const generateUploadURL = require('./s3.js');
const accountRouter = require('./routes/account.routes.js');
const messagesRoutes = require('./routes/messages.routes.js');
const checkoutRoutes = require('./routes/checkout.routes.js');
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../client')));
app.use('/account/', accountRouter);
app.use('/messages', messagesRoutes);
app.use('/checkout', checkoutRoutes);

app.get('/s3url', async (req, res) => {
  const url = await generateUploadURL();
  res.send({url});
});

// All other routes must go above this function
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

module.exports = app;