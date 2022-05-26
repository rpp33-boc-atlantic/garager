const express = require('express');
const accountRouter = require('./routes/account.routes.js');


const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const messagesRoutes = require('./routes/messages.routes.js');

app.use('/account/', accountRouter);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static(path.join(__dirname, '../client')));

app.get('/test', (req, res) => {
  res.send('hi');
});

app.use('/messages', messagesRoutes);

// All other routes must go above this function
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

module.exports = app;