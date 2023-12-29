const express = require("express");
var router = express.Router();
const mysql = require("mysql");
const { route } = require(".");
const async = require('async');
//mysqlに接続する際のデータを入れ、接続できるようにする。

router.get("/", (req, res)=>{
    var app = req.app;
    var name1 = req.query.name;
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
                     callback(null,result[0].room_ID);
                   }) 
                },
                function(roomID,callback){ 
                    var sql2 = "select question_ID from question_log where room_ID = ?;";
                    connection.query(sql2,roomID,(err,result2,field)=>{
                        if(err){
                            console.log(err);
                        }
                        callback(null,roomID,result2[0].question_ID);
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
                        var sql4 = "select q.question_text,l.limit_time from question_table q,question_log l where q.question_ID = l.question_ID and l.question_ID = ? and l.question_ID = ?;";
                        connection.query(sql4,[questionID,roomID],(err,result4,field)=>{
                            if(err){
                                console.log(err);
                            }
                            var data ={
                                text:result4[0].question_text,
                                time:result4[0].limit_time
                            }
                            res.render('index',data);
                        })
                    }else{
                        var sql4 = "select q.question_text,l.limit_time from question_table q,question_log l where q.question_ID = l.question_ID and l.question_ID = ? and l.question_ID = ?;";
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
                    }
                }
            ],
            function(err){
                res.render('hyouji2');
            })
            /*for(var i = 0;i < result2.length;i++){
               if(result2[i].sentaku == 1){
                connection.query(sql3,(err,result,fields)=>{
                if(err){
                    console.log(err);
                }
                res.render('index',{web:result});
               })
               }
            }
            res.render('hyouji2');*/
        //})
        //connection.release();
    })
    
    /*connection.query(sql, (err, result, fields)=>{
        if(err){
            console.log(err);
        }
        //「resultの中にあるmondaibunのデータ」を格納している。「result」は配列になっている。
        bun = result[0].mondaibun;
        name1 = result[0].mon_ID;
        connection.query(sql2,name1,(err,results2,fields) =>{
            if(err) throw err;
            time1 = results2[0].time;
            //変数の中に複数の変数を作り、複数データを格納している。
            var data1 ={
                bun1:bun,
                time:time1
            }
            //複数データを格納したデータを"index.ejs"ファイルに送っている。
            res.render("index", data1);
        })
        connection.end();
    })*/
})


module.exports = router;