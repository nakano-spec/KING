var express = require('express');
var router = express.Router();

let str = "革命はテレビでは放送されない";
console.log(str);

router.get('/', function(req, res, next) {
    res.render('Question_manage.js');
  });

module.exports = router;







