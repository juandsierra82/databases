var mysql = require('mysql');


exports.createConnection = function(){
  return mysql.createConnection({
  // host: '127.0.0.1:3000',
  user: 'root',
  password: '',
  database: 'chat'
}).connect()
};



// connection.query('INSERT QUERY HERE', function(err, rows, fields){
//   if (err) throw err;
//   console.log('Query sent.');
// })

// connection.end();


// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".


