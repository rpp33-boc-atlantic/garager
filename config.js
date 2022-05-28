require('dotenv').config();

const config = {
  // env: process.env.NODE_ENV || "development",
  port: process.env.PORT || 3000,
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
};

module.exports = config;