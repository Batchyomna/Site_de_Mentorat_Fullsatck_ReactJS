const mysql = require('mysql2');
//-------------------- create the connection to database projetfinal
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'projetfinal'
  });
  
  connection.connect(function (err) {
    if (err) throw err;
    console.log("you are connected to DB ");
  
  })
  module.exports = connection