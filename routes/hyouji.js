const express = require("express");
var router = express.Router();
const mysql = require("mysql");
const { route } = require(".");
const async = require('async');
//mysqlに接続する際のデータを入れ、接続できるようにする。

router.get("/", (req, res)=>{
    var app = req.app;
    var poolCluster = app.get('pool');
    var pool = poolCluster.of
    var pool = poolCluster.of('MASTER');
    /*const sql = "select mon_ID,mondaibun from mondai_LIST where sentaku = '1';"
    const sql2 = "select time from time_LIST where mon_ID = ?"*/
    const sql3 = "select m.question_ID,m.question_text,m.picturename,t.time from mondai_LIST m,time_LIST t where sentaku = '1' and m.mon_ID = t.mon_ID";
    const sql4 = "select question_log.question_ID,question_text,picture_flag from question_table,question_log where question_log.question_ID=question_table.question_ID AND question_status = 1 AND room_ID = 1;"
    const pics_sql = "select pics_name from pics_table WHERE question_ID = ?;"
    /*var bun = 0;
    var name1 = 0;
    var time1 = 0;*/
    pool.getConnection(function(err,connection){
        connection.query(sql4,(err,result2,fields)=>{
            if(err){
                console.log(err);
            }
            async.waterfall([
                function(callback){
                    for(var i = 0;i < result2.length;i++){
                        if(result2[i].sentaku == 1){
                         connection.query(pics_sql,(err,result,fields)=>{
                         if(err){
                             console.log(err);
                         }
                         res.render('index',{web:result});
                        })
                        }
                     }
                },
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
        })
        connection.release();
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