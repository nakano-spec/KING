var express = require('express');
var router = express.Router();
const mysql = require("mysql");
//mysqlに接続する際のデータを入れ、接続できるようにする。
/*const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "20021225",
    database: "mydb"
});*/

/* GET users listing. */
router.get('/', function(req, res, next) {
   var data1 = req.query.data
   var app = req.app;
   var poolCluster = app.get("pool");
   var pool = poolCluster.of('MASTER');
   var sql4 = "select u.username,k.kai from kaitou_LIST k,users u where u.user_ID = k.user_ID and u.username = ?;"
   pool.getConnection(function(err,connection){
    connection.query(sql4,data1,(err,result,fields) =>{
        res.render('hyouji3',{data:result});
       })
       connection.release();
   })
});

module.exports = router;