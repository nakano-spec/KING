var express = require('express');
var router = express.Router();

const mysql = require("mysql")
//このページに来たら最初に行う処理
/* GET users listing. */
router.get("/", (req, res)=> {
    res.render('account_addition.ejs');
});

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'matosui122083',
    database: 'mydb2'
  });


//このページに来たら最初に行う処理
/* GET users listing. */
/*router.get('/', function(req, res, next) {
  res.render('account_addition.ejs');
});*/

module.exports = router;