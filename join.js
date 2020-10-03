var express = require("express");
var app = express();
var router = express.Router();
var path = require("path");
var join = require("./nodejs/router");
var main = require("index.html");
router.get("/", function (request, response) {
  response.sendFile(path.join(__dirname + "index.html"));
});

router.use("/join", join);
router.use("/main", main);

module.exports = router;
