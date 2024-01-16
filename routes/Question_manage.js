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
    const sql = 'select * from Question_manage;'
    var app = req.app;
    var poolCluster = app.get("pool");
    var pool = poolCluster.of('MASTER');
            connection.release();
    })



module.exports = router;



