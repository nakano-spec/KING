const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    var app = req.app;
    var Questionsql = 'SELECT question_name FROM question_table;';
    //var Questionsql2 = 'SELECT question_text FROM uestion_table;';
    var poolCluster = app.get("pool");
    var pool = poolCluster.of('MASTER');

    pool.getConnection(function(err, connection) {
        if (err) {
            console.error("DB connection error:", err);
            res.status(500).send("Database connection error");
            return;
        }

        // 最初のクエリを実行
        connection.query(Questionsql, (err, results1, fields) => {
            if (err) {
                connection.release();
                console.error("Query error:", err);
                res.status(500).send("Database query error");
                return;
            }

            // ２つ目のクエリを実行
         /*   connection.query(Questionsql2, (err, results2, fields) => {
                connection.release(); // コネクションをリリース

                if (err) {
                    console.error("Query error:", err);
                    res.status(500).send("Database query error");
                    return;
                }
*/
                // 両方のクエリ結果をビューに渡す
                res.render('Question_manage', { questionNames: results1});
            });
        });
    });


module.exports = router;
