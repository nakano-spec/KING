var express = require('express');
var router = express.Router();

/*const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "20021225",
    database: "mydb"
});
connection.connect();*/

/* GET users listing. */
router.get('/', function(req, res, next) {
   var data1 = req.query.data
   var app = req.app;
   var poolCluster = app.get("pool");
   var pool = poolCluster.of('MASTER')
   var sql4 = "select q.question_name,q.question_text,s.select_1,s.select_2,s.select_3,s.select_4,c.answer from question_table q,correct_table c,select_table s where question_name = ? and q.question_ID = s.question_ID and q.question_ID = c.question_ID;"
   pool.getConnection(function(err,connection){
    connection.query(sql4,data1,(err,result,fields) =>{
        if(err){
            console.log(err);
        }
        res.render('kakunin.ejs',{data:result});
        connection.release();
   })

})
});

module.exports = router;