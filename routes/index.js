var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({ title: 'Nguyễn Văn Hướng', name: "Hướng IT"})
});

module.exports = router;
