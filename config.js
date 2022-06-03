require('dotenv').config();

const config = {
  // env: process.env.NODE_ENV || "development",
  port: process.env.PORT || 3000,
  MAPS_API_KEY: process.env.MAPS_API_KEY,
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
  RDS_PASSWORD: process.env.RDS_PASSWORD
};

module.exports = config;