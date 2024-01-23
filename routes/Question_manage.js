var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
    let str = "革命はテレビでは放送されない";
　　console.log(str);
    res.render('Question_manage');
  });

module.exports = router;







