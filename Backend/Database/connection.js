const mysql = require('mysql2/promise');
const connection = mysql.createPool({
  host: '127.0.0.1',
  port: 3308,
  user: 'root',
  // password: 'TochielVroXd12',
  // database: 'bd_ds',
  password: 'Xingyue@1',
  database: 'bd_ventas',
  waitForConnections: true,
  connectionLimit: 10,
});
module.exports = connection;