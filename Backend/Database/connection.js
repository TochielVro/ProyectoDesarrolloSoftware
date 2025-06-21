const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'TochielVroXd12',
  database: 'bd_localink'
});
module.exports = connection;