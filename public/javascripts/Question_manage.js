// MySQLモジュールのインポート
const mysql = require('mysql2');

// データベースへの接続設定
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '20021225',
  database: 'your_database_name'
});

// データベースへの接続
connection.connect(err => {
  if (err) {
    console.error('データベースへの接続エラー: ' + err.stack);
    return;
  }
  console.log('データベースに接続されました。');
});

// SQLクエリの実行
connection.query('SELECT * FROM your_table_name', (err, results, fields) => {
  if (err) {
    console.error('クエリエラー: ' + err.stack);
    connection.end();
    return;
  }

  // 結果の処理
  console.log(results);

  // 接続の終了
  connection.end();
});
