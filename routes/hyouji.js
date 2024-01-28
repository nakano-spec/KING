const express = require("express");
var router = express.Router();
const mysql = require("mysql");
const { route } = require(".");
const async = require('async');
//mysqlに接続する際のデータを入れ、接続できるようにする。

router.get("/", (req, res)=>{
    var app = req.app;
    var name1 = req.session.user.username;
    var poolCluster = app.get('pool');
    var pool = poolCluster.of('MASTER');
    const sql = "select room_ID from login_log where user_ID = ?;";
    pool.getConnection(function(err,connection){
        //connection.query(sql4,(err,result2,fields)=>{
            async.waterfall([
                function(callback){
                   connection.query(sql,name1,(err,result,field)=>{
                     if(err){
                        console.log(err);
                     }
                     console.log(result[0].room_ID);
                     callback(null,result[0].room_ID);
                   }) 
                },
                function(roomID,callback){ 
                    var sql2 = "select question_ID from question_log where room_ID = ? and question_status = 1;";
                    connection.query(sql2,roomID,(err,result2,field)=>{
                        if(err){
                            console.log(err);
                        }
                        if(result2 && result2.length > 0){
                            console.log(result2[0].question_ID);
                            callback(null,roomID,result2[0].question_ID);
                        }else{
                            res.render('hyouji2');
                        }
                        
                    })
                },
                function(roomID,questionID,callback){
                    var sql3 = "select pics_name from pics_table where question_ID = ?;";
                    connection.query(sql3,questionID,(err,result3,field)=>{
                        if(err){
                            console.log(err);
                        }
                        if(result3.length == 0){
                            var result = 0;
                            callback(null,roomID,questionID,result);
                        }else{
                            var result = result3[0].pics_name;
                            callback(null,roomID,questionID,result);
                        }
                    })
                },
                function(roomID,questionID,result,callback){
                    if(result == 0){
                        var sql4 = "select q.question_text,l.limit_time from question_table q,question_log l where q.question_ID = l.question_ID and l.question_ID = ? and l.room_ID = ?;";
                        connection.query(sql4,[questionID,roomID],(err,result4,field)=>{
                            if(err){
                                console.log(err);
                            }
                            var data ={
                                text:result4[0].question_text,
                                time:result4[0].limit_time,
                                picture:result
                            }
                            res.render('index',data);
                        })
                    }else{
                        var sql4 = "select q.question_text,l.limit_time from question_table q,question_log l where q.question_ID = l.question_ID and l.room_ID = ? and l.question_ID = ?;";
                        connection.query(sql4,[roomID,questionID],(err,result4,field)=>{
                            if(err){
                                console.log(err);
                            }
                            var data ={
                                text:result4[0].question_text,
                                time:result4[0].limit_time,
                                picture:result
                            }
                            res.render('index',data);
                        })
                    }
                }
            ],
            function(err){
                res.render('hyouji2');
            })
    })
})


module.exports = router;