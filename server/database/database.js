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
/*const pool = new Pool({
  user: 'root',
  host: 'localhost',
  database: 'garager',
  password: 'password',
  port: 5432
});*/

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

module.exports = pool;