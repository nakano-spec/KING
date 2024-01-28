const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    var app = req.app;
    var QuestionSql = 'SELECT question_name, question_text FROM question_table;';
    var QuestionDelete = 'DELETE FROM question_table WHERE question_name = QuestionName;';
    var poolCluster = app.get('pool2');
    var pool = poolCluster.of('MASTER');

    //dbと接続できたか
    pool.getConnection(function(err1, connection) {
        if (err1) {
            console.error("DB connection error:", err1);
            res.status(500).send("Database connection error");
            return;
        }

        connection.query(QuestionSql, (err2, results) => {
            

            if (err2) {
                console.error("Query error:", err2);
                res.status(500).send("Database query error");
                return;
            }
            connection.release(); // コネクションをリリース
            // クエリの結果をビューに渡す
            res.render('Question_manage', { questions: results });
        });
    });
});

module.exports = router;
