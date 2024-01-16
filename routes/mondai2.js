var express = require('express');
var router = express.Router();
const mysql = require("mysql");
/*const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "20021225",
    database: "mydb"
});*/

//connection.connect();



/* GET users listing. */
router.get('/', function(req, res, next) {
  var by = req.query.byou;
  var app = req.app;
  var poolCluster = app.get("pool");
  var pool = poolCluster.of('MASTER');
  const set_time = "UPDATE question_log SET limit_time  = ? WHERE question_status = 1 AND room_ID = 1;"
  pool.getConnection(function(err,connection) {
    if(err != null){
      console.log(err);
      return;
    }

    connection.query(set_time,[by],(err,result,fields) =>{
      if(err){
        console.log(err);
      }
      connection.commit((err) =>{
        if(err){connection.rollback(() =>{throw console.log('error');});}
      })
    })
    console.log("追加しました。");
    connection.release();
  })
  var data1={
    byou1:by
  }
  res.render('mondai3.ejs',data1);
});

module.exports = router;