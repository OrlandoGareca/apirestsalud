var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  var imc = Number(req.body.masa)/ Math.pow(Number(req,body.altura),2)
  if(imc<16){
    res.send(
    {
        "msn": "delgadez severa"
    })
  }else if(imc >16 && imc < 16.99){
    res.send(
    {
        "msn": "delgadez moderada"
    })
  }
  else if(imc >17 && imc < 18.49){
    res.send(
    {
        "msn": "delgadez leve"
    })
  }
  else if(imc >18.5 && imc < 24.99){
    res.send(
    {
        "msn": "normal"
    })
  }
//res.render('index', { title: 'Express' });
});

module.exports = router;
