//dependencies and imports
const mysql = require('mysql2');

// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      // Your MySQL username,
      user: 'root',
      // Your MySQL password
      password: 'yourpasswordhere',
      database: 'employeesdb'
    },
    console.log('Connected to the employeesdb database.')
  );

  module.exports = db;