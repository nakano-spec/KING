var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
    res.render('javascripts/Question_manage.ejs');
  });
module.exports = router;