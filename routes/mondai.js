var express = require('express');
const { appendFileSync } = require('fs-extra');
var router = express.Router();

/*
router.get('/', function(req, res, next) {
  var name_queli = req.query.name_queli;
  var app = req.app;
  const sql = "select qualification_name from genre_table;"  //リスト表示用SQL
  const poolCluster = app.get('pool');
  var pool = poolCluster.of('MASTER');
  pool.getConnection(function(err,connection){
    if(err != null){
      console.log(err);
      return;
    }
    pool.query(sql,(err,result2,field)=>{
      if(err){
        console.log(err);
      }
      var data_quali = {
        name_quali:name02,
        web_quali:result2
      }
      res.render('mondai2',data_quali);
    });
    connection.release();
  });
});
*/

/* GET home page. */
router.get('/', function(req, res, next) {
  var name1 = req.query.name;
  var app = req.app;
  const sql = "select question_name from question_table;"  //リスト表示用SQL
  const poolCluster = app.get('pool');
  var pool = poolCluster.of('MASTER');
  pool.getConnection(function(err,connection){
    if(err != null){
      console.log(err);
      return;
    }
    pool.query(sql,(err,result1,field)=>{
      if(err){
        console.log(err);
      }
      var data = {
        name:name1,
        web:result1
      }
      res.render('mondai2',data);
    });
    connection.release();
  })
});


module.exports = router;
