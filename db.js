const { Pool } = require('pg');
require('dotenv').config();

// Create a new pool instance with PostgreSQL credentials from .env
const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

// Export the pool so it can be used in controllers
module.exports = pool;
