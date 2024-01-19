const express = require("express");
var router = express.Router();
/*const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "20021225",
    database: "mydb"
});*/

//connection.connect();

sql.addEventListener('load',sampleEvent, false);
function sampleEvent() {
  
  //ここに処理を記述する
      connection.query(sql, [1, 2], function(err, rows) {
        console.log(rows);
      });
  
  module.exports = router;
}




