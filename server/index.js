const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const generateUploadURL = require('./s3.js');
const accountRouter = require('./routes/account.routes.js');
const messagesRoutes = require('./routes/messages.routes.js');
const checkoutRoutes = require('./routes/checkout.routes.js');
const itemRoutes = require('./routes/item.routes.js');
const browseRoutes = require('./routes/browse.routes.js');
const postItemRouter = require('./routes/postItem.routes.js');
const authRouter = require('./routes/auth.routes.js');
const app = express();

// Outlier route for Stripe Webhooks (needs to be above bodyParser)
app.use('/checkout/webhook', checkoutRoutes);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../client')));

// *NOTE: PLEASE KEEP ABOVE ROUTES SETUP* Session needed for creating stripe accounts
app.use(
  session({
    secret: 'atlantic BOC',
    resave: false,
    saveUninitialized: true,
  })
);

// ROUTES SETUP
app.use('/account', accountRouter);
app.use('/messages', messagesRoutes);
app.use('/checkout', checkoutRoutes);
app.use('/item', itemRoutes);
app.use('/browse', browseRoutes);
app.use('/postItem', postItemRouter);
app.use('/auth', authRouter);

app.get('/s3url', async (req, res) => {
  const url = await generateUploadURL();
  res.send({url});
});

// app.get('/get-data', accountRouter);

// All other routes must go above this function
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});
// app.use('/account/', accountRouter);

module.exports = app;