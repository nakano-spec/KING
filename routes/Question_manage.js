const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    var app = req.app;
    var Questionsql = 'select * from Question_manage;'
    var poolCluster = app.get("pool");
    var pool = poolCluster.of('MASTER');
    pool.getConnection(function(err,connection){
        connection.query(Questionsql,(err,results,fields)=>{
        res.render('Question_manage', {Questionsql:results });
        //res.render('hyouji4',{han1:results});
        })
        connection.release();
    
});
module.exports = router;