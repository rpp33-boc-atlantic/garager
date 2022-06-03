require('dotenv').config();
const RDS_PASSWORD = require('../../config.js').RDS_PASSWORD;
const { Client } = require('pg');

// const client = new Client({
//   user: 'garagerAdmin',
//   host: 'garager.c11jhqw8tzhf.us-east-1.rds.amazonaws.com',
//   database: 'garager',
//   password: RDS_PASSWORD,
//   port: 5432
// });

const client = new Client({
  host: 'localhost',
  database: 'garager',
  port: 5432
});

client.connect((err, res) => {
  if (err) {
    console.log(err);
  } else {
    console.log('connected to GARAGER database');
  }
});

module.exports = client;