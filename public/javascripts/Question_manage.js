const express = require('express');
const mysql = require('mydb2');
const app = express();
const port = 3000;

// データベース接続設定
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '20021225',
  database: 'mydb2'
});

// APIエンドポイント
app.get('/api/data', (req, res) => {
  connection.query('SELECT * FROM mydb2', (err, results) => {
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
