// Node.jsとExpressを使用したサーバーサイドの例
const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;

// データベース接続設定
const connection = mysql.createConnection({
  host: 'データベースのホスト',
  user: 'ユーザー名',
  password: 'パスワード',
  database: 'データベース名'
});

// データベース接続
connection.connect();

app.get('/questions', (req, res) => {
  // question_tableからデータを取得するクエリ
  connection.query('SELECT question_name, question_text FROM question_table', (error, results, fields) => {
    if (error) throw error;
    // JSONとして結果を返す
    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
