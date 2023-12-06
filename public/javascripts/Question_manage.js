const express = require('express');
const mysql = require('mysql1'); // ここを修正
const app = express();
const port = 3000;

// データベース接続設定
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root', // 環境変数を使用することをお勧めします
  password: '20021225', // 環境変数を使用することをお勧めします
  database: 'mydb2'
});

// APIエンドポイント
app.get('/api/data', (res) => {
  connection.query('SELECT * FROM question_table', (err, results) => { // テーブル名を修正
    if (err) {
      res.status(500).send('Database error');
      return;
    }
    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
