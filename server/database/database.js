require('dotenv').config();
const RDS_PASSWORD = require('../../config.js').RDS_PASSWORD;
const { Pool } = require('pg');

const pool = new Pool({
  user: 'garagerAdmin',
  host: 'garager.c11jhqw8tzhf.us-east-1.rds.amazonaws.com',
  database: 'garager',
  password: RDS_PASSWORD,
  port: 5432
});

// client.connect((err, res) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log('connected to GARAGER database');
//   }
// });

module.exports = pool;