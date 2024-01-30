var express = require('express');
var router = express.Router();
const mysql = require("mysql");

/* GET users listing. */
router.get('/', function(req, res, next) {
  var second1 = parseInt(req.query.second);
  var name1 = req.query.name;
  /*const sql1 = "select mon_ID from mondai_LIST where sentaku = '1';"
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
  }*/
  var data1　={
    second:second1,
    name:name1
  }
  res.render('mondai3.ejs',data1);
});

module.exports = router;