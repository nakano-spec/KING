const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    var app = req.app;
    var Questionsql = 'SELECT * FROM Question_table;';
    var poolCluster = app.get("pool");
    var pool = poolCluster.of('MASTER');

    pool.getConnection(function(err, connection) {
        if (err) {
            console.error("DB connection error:", err);
            res.status(500).send("Database connection error");
            return;
        }

        connection.query(Questionsql, (err, results, fields) => {
            connection.release(); // コネクションをリリース

            if (err) {
                console.error("Query error:", err);
                res.status(500).send("Database query error");
                return;
            }

            // クエリの結果をビューに渡す
            res.render('Question_manage', { questions: results });
        });
    });
});

module.exports = router;
