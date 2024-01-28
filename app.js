// パッケージの読み込み
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var multer = require('multer');
var cors = require('cors');
var mysql = require('mysql2');

// ルーターの設定
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
// 他のルーターも同様に...

var app = express();

// データベース設定
const db_conf = {
  host: 'localhost',
  user: 'root',
  password: '20021225',
  database: 'mydb2',
};

// データベース接続プールの作成
const pool = mysql.createPool(db_conf);
app.set('pool', pool);

// アプリケーションの設定
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// ルートハンドラーの追加
app.use('/', indexRouter);
app.use('/users', usersRouter);
// 他のルートも同様に...

// 404エラーハンドラー
app.use(function(req, res, next) {
  next(createError(404));
});

// エラーハンドラー
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

// multerの設定
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null, './public/images')
  },
  filename: function(req, file, cb) {
      cb(null, file.originalname)
  }
});
var upload = multer({ storage: storage });
app.post('/', upload.array('uploadfile'), function(req, res) {
  console.log(req.file);
});

app.use(cors());

module.exports = app;
