const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST, 
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

exports.login = async(req,res) => {
    try {
        const {id, password} = req.body;
        if(!id || !password) {
            return res.status(400).render('login', {
                message: 'Please provide and id and password'
            })
        }
        db.query('SELECT * FROM customers WHERE id=?', [id], async (error, results) =>{
            console.log(results);
            if(!results || !(await bcrypt.compare(password, results[0].password))) {
                res.status(401).render('login', {
                    message: '아이디 또는 비밀번호가 맞지 않습니다. 다시 입력해주세요.'
                })
            }else {
                let num =0;
                num++;
                const token = jwt.sign({num}, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRES_IN
                });

                // console.log('the token is: ' +token);

                const cookieOptions = {
                    expires: new Date(
                        Datae.now() + process.env.JWT_COOKIE_EXPIRES * 24*60*60*1000
                    ),
                    httpOnly: true
                }
                res.cookie('jwt', token, cookieOptions);
                res.status(200).redirect('/');
            }
        })

    } catch (error) {
    console.log(error);        
    }
}

exports.register = (req, res) => {
    console.log(req.body);
    const {id, password, passwordConfirm, name, phone, email, emailDetail, zipcode, address, addressDetail} = req.body;
    db.query('SELECT id from customers WHERE id=?', [id], async (error, results) =>{
        if(error) {
            console.log(error);
        }
        if(results.length >0) {
            return res.render('register', {
                message: '이미 사용중인 아이디입니다. 다른 아이디를 입력해주세요.'
            })
        }else if(password !== passwordConfirm ||passwordConfirm.value=="" || password.value=='') {
            return res.render('registser', {
                message: '비밀번호가 일치하지 않습니다. 다시 입력해주세요.'
            });
        }
        let hashedPassword = await bcrypt.hash(password,8);
        db.query('INSERT INTO customers set ?', {id:id, password:hashedPassword, name:name, phone:phone,
            email:email, emailD:emailDetail, zipcode:zipcode, address:address, addressD:addressDetail 
        }, (error,results) =>{
            if(error) {
                console.log(error);

            }else {
                console.log(results);
                return res.render('login' , {
                    message: '<i class="fas fa-check" style="color: #2d96e0;">'
                });
            }
        })
    });
}


exports.breadList = (req, res) => {
    console.log(req);


}