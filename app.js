const express = require('express');
const path = require('path');
const mysql = require('mysql');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

dotenv.config({path: './.env'}); //sensitive한 정보 따로 담아두기 

const app = express();

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
})

const publicDirectory = path.join(__dirname, './css')
app.use(express.static(publicDirectory))
app.use('/js', express.static(__dirname + "/js"));
app.use('/images', express.static(__dirname + "/images"));
app.use('/data', express.static(__dirname + "/data"));


app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.set('view engine', 'hbs');

db.connect((error) => {
    if(error) {
        console.log(error)
    }else{
        console.log('MySql connected..')
    }
})

app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));

app.listen(5500, () => {
    console.log('Server started from 5500!')
})