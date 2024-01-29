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
   var sql4 = "select m.name,m.mondaibun,m.sen1,m.sen2,m.sen3,m.sen4,s.seikai from mondai_LIST m,seikai_LIST s where name = ? and m.seikai_ID = s.seikai_ID and m.mon_ID = s.mon_ID;"
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