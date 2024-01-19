const express = require("express");
var router = express.Router();

var socket = io();

/*loadでページが読み込まれたときに */
socket.addEventListener('load',sampleEvent, false);
function sampleEvent() {
  let sql = 'select * from Question_manage;'
  connection.query(sql(question_id,question_name,question_text,picture_flag,type_id))
  if(question_id){
    console.log(question_id);
  }
  //ここに処理を記述する
  
  module.exports = router;
}









