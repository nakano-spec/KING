const express = require("express");
var router = express.Router();
const mysql = require("mysql2");
/*const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "20021225",
    database: "mydb"
});*/

//connection.connect();

router.get("/", (req, res)=>{
    const sql = "select m.mon_ID,u.username,k.kai,k.han from kaitou_LIST k,users u,mondai_LIST m where k.user_ID = u.user_ID and k.mon_ID = m.mon_ID;"
    const sql2 = "select s.seikai from kaitou_LIST k,seikai_LIST s where k.mon_ID = s.mon_ID"
    const sql3 = "select k.kai_keisiki,m.mon_ID from kaikeisiki_LIST k, mondai_LIST m where m.sentaku = '1' and m.kai_ID = k.kai_ID;"
    const sql4 = "select h.han_keisiki from hankeisiki_LIST h,monhan_LIST m where h.han_ID = m.han_ID and m.mon_ID = ?;"
    var app = req.app;
    var poolCluster = app.get("pool2");
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