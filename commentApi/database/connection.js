//connect to mysql
var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'lzmlzq883127'
});

module.exports = connection;