require('dotenv').config();

const config = {
  // env: process.env.NODE_ENV || "development",
  port: process.env.PORT || 3000,
  //STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
  MAPS_API_KEY: process.env.MAPS_API_KEY
};

module.exports = config;