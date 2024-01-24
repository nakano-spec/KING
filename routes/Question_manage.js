const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    var app = req.app;
    var Questionsql = 'SELECT * FROM question_table;';
    var poolCluster = app.get("pool");
    var pool = poolCluster.of('MASTER');

    pool.getConnection(function(err, connection) {
        if (err) {
            // コネクション取得時のエラー処理
            console.error("DB connection error:", err);
            res.status(500).send("Database connection error");
            return;
        }

        connection.query(Questionsql, (err, results, fields) => {
            connection.release(); // コネクションをリリース

            if (err) {
                // クエリ実行時のエラー処理
                console.error("Query error:", err);
                res.status(500).send("Database query error");
                return;
            }

            // クエリの結果をビューに渡す
            res.render('Question_manage', { results: results });
        });
    });
});

module.exports = router;
