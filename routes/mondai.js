var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  var name1 = req.query.name;
  var pool = req.app.get('pool');

  const sql = "SELECT name FROM mondai_LIST;";
  pool.query(sql, (err, result1) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Database query error');
    }
    var data = {
      name: name1,
      web: result1
    };
    res.render('mondai2', data);
  });
});

module.exports = router;
