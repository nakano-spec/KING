const express = require("express");
var router = express.Router();
const mysql = require("mysql");
/*const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "20010426",
    database: "mydb"
});*/

/* GET users listing. */
router.get('/', function(req, res, next) {
   var app = req.app;
   var s = 'select u.username,k.kai,k.han from kaitou_LIST k,users u where k.user_ID = u.user_ID;'
   var poolCluster = app.get("pool");
   var pool = poolCluster.of('MASTER');
   pool.getConnection(function(err,connection){
   connection.query(s,(err,results,fields)=>{
    res.render('hyouji4',{han1:results});
   })
   connection.release();
   })
});

module.exports = router;