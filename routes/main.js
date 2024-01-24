var express = require('express');
const { appendFileSync } = require('fs-extra');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  var name1 = req.query.name;
  
  /*var data = {
    name:name1,
    session:req.session
  }*/
  res.render('main',{name:req.session.user.username});
});


module.exports = router;