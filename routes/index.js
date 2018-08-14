var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'HOLA ESTO ES UN MENSAJE DESDE DOCKER' });
});

module.exports = router;
