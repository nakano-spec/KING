const express = require("express");
var router = express.Router();
const mysql = require("mysql");
const async = require('async');

router.get("/", (req, res) => {
    var app = req.app;
    var name1 = req.session.user.username;
    var pool = app.get('pool').of('MASTER');

    pool.getConnection(function(err, connection) {
        if (err) {
            console.error("DB connection error:", err);
            res.status(500).send("Database connection error");
            return;
        }

        async.waterfall([
            function(callback) {
                const sql = "SELECT room_ID FROM login_log WHERE user_ID = ?;";
                connection.query(sql, [name1], (err, result) => {
                    if (err) return callback(err);
                    var roomID = result[0].room_ID;
                    callback(null, roomID);
                });
            },
            function(roomID, callback) {
                var sql2 = "SELECT question_ID FROM question_log WHERE room_ID = ? AND question_status = 1;";
                connection.query(sql2, [roomID], (err, result2) => {
                    if (err) return callback(err);
                    if (result2.length > 0) {
                        var questionID = result2[0].question_ID;
                        callback(null, roomID, questionID);
                    } else {
                        res.render('hyouji2');
                    }
                });
            },
            // ... その他の処理
        ], function(err) {
            if (err) {
                console.error("Async waterfall error:", err);
                res.status(500).send("Server error");
            }
            connection.release();
        });
    });
});

module.exports = router;
