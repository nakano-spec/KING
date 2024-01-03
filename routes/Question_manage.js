var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
    res.render('Question_manage.ejs');
  });
module.exports = router;