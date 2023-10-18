const express = require("express");
var router = express.Router();
const mysql = require("mysql2");
const async = require('async');
const connection = mysql.createConnection({
host: "localhost",
user: "root",
password: "20010426",
database: "mydb2"
});
connection.connect();

router.get("/", (req, res)=>{
var name2 = req.query.name;
const sql = "select * from mondai_LIST where sentaku = 1;"
const sql1 ="select sentaku from mondai_LIST;"
const sql2 ="select f.kai_keisiki from kaikeisiki_LIST f,mondai_LIST m where f.kai_ID = m.kai_ID and m.sentaku = '1';"
const sql3 = "select mondaibun from mondai_LIST where sentaku = '1';"
var mikke = 0;
connection.query(sql1,(err,result,fields)=>{
 if(err){
  console.log(err);
 }
async.waterfall([
 function(callback){
  for(var i = 0;i < result.length && mikke == 0;i++){
   if(result[i].sentaku == 1){
    connection.query(sql2,(err,result2,field)=>{
     if(err){
      console.log(err);
      }
     if(result2[0].kai_keisiki == "選択"){
      connection.query(sql, (err, result3, fields)=>{
       if(err){
        console.log(err);
       };
       var data={
        name: name2,
        web: result3
       }  
       res.render("kaitou2",data);
       mikke =1;
      })
}else if(result2[0].kai_keisiki == "入力"){
connection.query(sql3,(err,result3,fields)=>{
if(err){
console.log(err);
}
var data1={
name:name2,
web: result3
}
res.render('kaitou4',data1);
mikke=1;
})
}
})
}
}
}
],
function(err){
var data ={
name: name2 
}
res.render('kaitou',data);
}
)
/*for(var i = 0;i < result.length && mikke == 1;i++){
if(result[i].sentaku == 1){
connection.query(sql2,(err,result2,field)=>{
if(err){
console.log(err);
}
if(result2[0].kai_keisiki == "選択"){
connection.query(sql, (err, result3, fields)=>{
if(err){
console.log(err);
};
var data={
name: name2,
web: result3
}
res.render("kaitou2",data);
})
}else if(result2[0].kai_keisiki == "入力"){
connection.query(sql3,(err,result3,fields)=>{
if(err){
console.log(err);
}
var data1={
name:name2,
web: result3
}
res.render('kaitou4',data1);
})
}
})
}
}
var data ={
name: name2 
}
res.render('kaitou',data);*/
})
//connection.release();
//})
})

module.exports = router;
