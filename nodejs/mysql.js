const { constants } = require("buffer");
var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root123",
  database: "open_websites",
});

connection.connect();

connection.query("SELECT * from signup", function (error, results, fields) {
  if (error) {
    console.log(error);
  }
  console.log(results);
});

connection.end();
