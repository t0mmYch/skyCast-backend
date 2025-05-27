const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // Uncomment and edit below for local dev:
  // user: 'postgres',
  // host: 'localhost',
  // database: 'skycast',
  // password: 'yourpassword',
  // port: 5432,
});

module.exports = pool; 