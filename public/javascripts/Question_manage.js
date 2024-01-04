var socket = io();
window.onload = function(){
  // ページ読み込み時に実行したい処理
  socket.emit('Question_manage');
  connection.query(Question(question_id,question_name,question_text,picture_flag,type_id))
  console.log("なんかでた？");

  }  