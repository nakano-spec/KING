const express = require('express');
const router = express.Router();

// 問題の一覧表示
router.get('/', (req, res) => {
    var app = req.app;
    var QuestionSql = 'SELECT question_name, question_text FROM question_table;';
    var pool = app.get('pool2').of('MASTER');

    pool.query(QuestionSql, (err, results) => {
        if (err) {
            console.error("Query error:", err);
            res.status(500).send("Database query error");
            return;
        }
        // クエリの結果をビューに渡す
        res.render('Question_manage', { questions: results });
    });
});

// 選択された問題の削除
router.post('/delete-questions', (req, res) => {
    var app = req.app;
    var selectedQuestions = req.body.selectedQuestions;
    var pool = app.get('pool2').of('MASTER');

    if (!selectedQuestions) {
        return res.redirect('/'); // 選択された問題がない場合、元のページにリダイレクト
    }

    if (typeof selectedQuestions === 'string') {
        selectedQuestions = [selectedQuestions]; // 単一の選択肢の場合、配列に変換
    }

    var QuestionDeleteSql = 'DELETE FROM question_table WHERE question_name IN (?);';
    
    pool.query(QuestionDeleteSql, [selectedQuestions], (err) => {
        if (err) {
            console.error("Delete query error:", err);
            res.status(500).send("Database delete query error");
            return;
        }
        res.redirect('/'); // 削除後に元のページにリダイレクト
    });
});

module.exports = router;
