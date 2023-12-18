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
  const sql1 = "select question_ID from question_table where sentaku = '1';"
  const sql2 = "insert into time_LIST(mon_ID,time) values(?,?);"
  pool.getConnection(function(err,connection) {
    if(err != null){
      console.log(err);
      return;
    }

    connection.query(sql1,(err,result,fields) =>{
      if(err){
        console.log(err);
      }
      var name1 = result[0].mon_ID;
      connection.query(sql2,[name1,by],(err,results2,fields) =>{
        if(err){
          console.log(err);
        }
        connection.commit((err) =>{
          if(err){connection.rollback(() =>{throw console.log('error');});}
        })
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