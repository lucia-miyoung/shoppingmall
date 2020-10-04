var express = require("express");
var app = express();
var router = express.Router();
var path = require("path");
var mysql = require("mysql");

var db = mysql.createConnection({
  host: "localhost",
  port: 5501,
  user: "root",
  password: "root123",
  database: "open_websites",
});

db.connect();

router.get("/", function (request, response) {
  response.sendFile(path.join(__dirname, "../sign-up.html"));
});

router.post("/", function (request, response) {
  //   var body = request.body;
  //   var email = body.email;
  //   var name = body.name;
  //   var passwd = body.password;
  const newId = document.querySelector(".id").value;
  const newPw = document.querySelector(".password").value;
  const newName = document.querySelector(".name").value;
  const newPhone = document.querySelector(".phone").value;
  const newEmail = document.querySelector(".email").value;
  const newEmailDetail = document.querySelector("#email-input").value;
  const newZipcode = document.querySelector(".zipcode").value;
  const newAdrs = document.querySelector(".address").value;
  const newAdrsDetail = document.querySelector(".address__detail").value;

  db.query(
    `INSERT INTO signup VALUES(?,?,?,?,?,?,?,?,?)
    `,
    [
      newId,
      newPw,
      newName,
      newPhone,
      newEmail,
      newEmailDetail,
      newZipcode,
      newAdrs,
      newAdrsDetail,
    ],
    function (error, pieces) {
      if (error) {
        throw error;
      }
      response.writeHead(200);
      response.end();
    }
  );
});

module.exports = router;
