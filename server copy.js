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

var app = http.createServer(function (request, response) {
  var _url = require.url;
  var queryData = url.parse(_url, true).query;
  var pathname = url.parse(_url, true).pathname;

  const newId = document.querySelector(".id").value;
  const newPw = document.querySelector(".password").value;
  const newName = document.querySelector(".name").value;
  const newPhone = document.querySelector(".phone").value;
  const newEmail = document.querySelector(".email").value;
  const newEmailDetail = document.querySelector("#email-input").value;
  const newZipcode = document.querySelector(".zipcode").value;
  const newAdrs = document.querySelector(".address").value;
  const newAdrsDetail = document.querySelector(".address__detail").value;

  if (pathname === "/login") {
    db.query(`select id, password from signup where id = ?`, []);
    // if (queryData.id === undefined) {
    //   db.query(
    //     `INSERT INTO signup VALUES(?,?,?,?,?,?,?,?,?)
    //   `,
    //     [
    //       newId,
    //       newPw,
    //       newName,
    //       newPhone,
    //       newEmail,
    //       newEmailDetail,
    //       newZipcode,
    //       newAdrs,
    //       newAdrsDetail,
    //     ],
    //     function (error, result) {
    //       if (error) {
    //         throw error;
    //       }
    //       response.writeHead(200);
    //       response.end();
    //     }
    //   );
    // } else {
    //   // 상세보기 구현
    // }
  }
});

var app = http.createServer(function (request, response) {
  var url = request.url;
  if (request.url == "/") {
    url = "/index.html";
  }
  if (request.url == "/favicon.ico") {
    return response.writeHead(404);
  }
  response.writeHead(200);
  response.end(fs.readFileSync(__dirname + url));
  /* __dirname 이 경로를 다 불려옴.. 저걸 바꾸면 메인의 화면이 달라짐 */
});
app.listen(5501);
