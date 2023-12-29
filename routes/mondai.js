var express = require('express');
const { appendFileSync } = require('fs-extra');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var name1 = req.query.name;
  var app = req.app;
  const sql = "select q.question_name,g.qualification_name,g.question_genre,g.question_years from question_table q,genre_table g;"
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
