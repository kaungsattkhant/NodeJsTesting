const mysql = require("mysql2");

// Create a connection to the database
const db = mysql.createConnection({
  host: "localhost",
  user: "root",          // Replace with your MySQL username
  password: "pass",      // Replace with your MySQL password
  database: "uplink",    // Replace with your database name
}).promise();

// Connect to the database
// db.connect((err) => {
//   if (err) {
//     console.error('Error connecting to MySQL:', err);
//     return;
//   }
//   console.log('Connected to MySQL database');
// });

// Export the connection
module.exports = db;