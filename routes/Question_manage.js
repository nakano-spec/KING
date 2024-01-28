const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    var app = req.app;
    var QuestionSql = 'SELECT question_name, question_text FROM question_table;';
    var poolCluster = app.get("pool");
    var pool = poolCluster.of('MASTER');

    pool.getConnection(function(err1, connection) {
        if (err1) {
            console.error("DB connection error:", err1);
            res.status(500).send("Database connection error");
            return;
        }

        connection.query(QuestionSql, (err2, results) => {
            connection.release(); // コネクションをリリース

            if (err2) {
                console.error("Query error:", err2);
                res.status(500).send("Database query error");
                return;
            }

            // クエリの結果をビューに渡す
            res.render('Question_manage', { questions: results });
        });
    });
});

module.exports = router;
