var http = require("http");
var fs = require("fs");
var url = require("url");
var qs = require("querystring");
var path = require("path");
var mysql = require("mysql");
var express = require("express");
var login = require("./routes/loginRouter");
var bodyParser = require("body-parser");
const { constants } = require("buffer");
var db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root123",
  database: "open_websites",
});
db.connect();

var app = express();
app.use(bodyParser.urlencoded({ extened: true }));
app.use(bodyParser.json());

var router = express.Router();

router.get("/", function (request, response) {
  response.json({ message: "welcome to our upload module apis" });
});

router.post("/sign-up", login.signup);
router.post("/login", login.login);
app.use("/api", router);
app.listen(5501);

exports.register = function (request, response) {
  var users = {};
};
