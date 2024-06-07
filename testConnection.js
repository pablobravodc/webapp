require('dotenv').config();
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'viaduct.proxy.rlwy.net',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 30075
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Connected to the database successfully.');
  }
  connection.end();
});
