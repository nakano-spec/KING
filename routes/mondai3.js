const express = require("express");
var router = express.Router();
const mysql = require("mysql");
/*const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "20021225",
    database: "mydb"
});*/

//connection.connect();

router.get("/", (req, res)=>{
    const sql = "select m.question_ID,u.user_name,k.answer,k.result from answer_table k,user_table u,question_table m where k.user_ID = u.user_ID and k.question_ID = m.question_ID;"
    const sql2 = "select s.answer from answer_table k,correct_table s where k.question_ID = s.question_ID"
    const sql3 = "select k.type_name,m.question_ID from answer_type k, question_table m question_log l where l.question_status = '1' and m.type_ID = k.type_ID;" //ログからも取る
    const sql4 = "select h.judge_type from judge_type h,question_log m where h.judge_ID = m.judge_ID and m.question_ID = ?;"
    var app = req.app;
    var poolCluster = app.get("pool");
    var pool = poolCluster.of('MASTER');
    pool.getConnection(function(err,connection){
        connection.query(sql, (err, result, fields)=>{
            if(err)throw err;
            console.log(result);
            var r1 = result.length;
            connection.query(sql2,(err,result2,fields)=>{
                var r2 =result2.length; 
                console.log(result2);
                console.log(r1);
                console.log(r2);
                for(var i = 0; i<r1;i++){
                    for(var j = 0;j<r2;j++){
                        if(result[i].han == "○"){
                        }else if(result[i].kai == result2[j].seikai){
                            result[i].han = "○";
                        }
                    }
                }
                connection.query(sql3,(err,result3,fields)=>{
                    if(err){
                        console.log(err);
                    }else if(result3[0].kai_keisiki == "選択"){
                        connection.query(sql4,result3[0].mon_ID,(err,result4,field)=>{
                        if(result4[0].han_keisiki == "手動"){
                            res.render('mondai5',{web : result});
                        }else if(result4[0].han_keisiki == "自動")
                        res.render("mondai4", { web: result});
                        })
                    }else if(result3[0].kai_keisiki == "入力"){
                        connection.query(sql4,result3[0].mon_ID,(err,result4,field)=>{
                            if(result4[0].han_keisiki == "手動"){
                                res.render("mondai5", { web: result});
                            }else if(result4[0].han_keisiki == "自動"){
                                res.render("mondai6",{ web: result});
                            }
                        })
                    }
                })
                
            })
            })
            connection.release();
    })
})


module.exports = router;