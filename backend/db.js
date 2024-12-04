const mysql = require('mysql');
require('dotenv').config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error('No fue posible establecer conexión a la base de datos:', err);
    return;
  }
  console.log('Conexión exitosa a la base de datos');
});

module.exports = db;