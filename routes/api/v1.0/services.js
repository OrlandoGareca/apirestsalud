var express = require('express');
var router = express.Router();
var _ = require("underscore");
var User = require("../../../database/collections/user");
//CRUD Create, Read , Update , Delete

//creation of users
router.post("/user",(req, res) => {
  //ejemplo de validacion
  if(req.body.name == "" && req.body.email == "") {
    res.status(400).json({
      "msn" : "formato incorrecto"
    });
    return;
  }
  var user = {
    nombre : req.body.nombre,
    apellido :req.body.apellido,
    correo : req.body.correo,
    numTelefono : req.body.numTelefono,
    ciudad : req.body.ciudad,
    direccion : req.body.direccion,
    contraseña : req.body.contraseña

  };
  var userData = new User(user);
  userData.save().then( () => {
    //content-type
    res.status(200).json({
      "msn" : "Usuario reguistrado con exito"
    });
  });
});

//READ of users
router.get("/user" , (req, res, next) => {
  User.find({}).exec( (error, docs) => {
    res.status(200).json(docs);
  })
});

//Read only one user
router.get(/user\/[a-z0-9]{1,}$/,(req, res) => {
  var url = req.url;
  var id = url.split("/")[2];
  User.findOne({_id : id}).exec( (err, docs) => {
    if(docs != null) {
      res.status(200).json(docs);
      return;
    }
    res.status(200).json({
      "msn" : "No existe el recurso "
    });
  })
});

router.delete(/user\/[a-z0-9]{1,}$/,(req, res) => {
  var url = req.url;
  var id = url.split("/")[2];
  User.findOne({_id : id}).remove().exec( (err, docs) => {
    res.status(200).json(docs);
  })
});
router.patch(/user\/[a-z0-9]{1,}$/,(req, res) => {
  var url = req.url;
  var id = url.split("/")[2];
  var keys = Object.keys(req.body);
  var user = {};
  for(var i = 0; i< keys.length; i++) {
    user[keys[i]] = req.body[keys[i]];
  }
  console.log(user);
  User.findOneAndUpdate({_id: id}, user, (err, params) => {
      if(err){
      res.status(500).json({
        "msn" : "Error no se pudo actualizar los datos"
      });
      return;
    }
    res.status(200).json(params);
    return;
  });
});


router.put(/user\/[a-z0-9]{1,}$/,(req, res) => {
  var url = req.url;
  var id = url.split("/")[2];
  var keys = Object.keys(req.body);
  var oficialkeys = [ 'name', 'altura', 'peso', 'edad', 'sexo', 'email'];
  var result = _.difference(oficialkeys, keys);
  if(result.length > 0){
    res.status(400).json({
      "msn" : "Existe un error en el formato de envio puede hacer uso del metodo patch si desea editar solo un fragmento de informacion"
    })
    return;
  }
  var user = {
    nombre : req.body.nombre,
    apellido :req.body.apellido,
    correo : req.body.correo,
    numTelefono : req.body.numTelefono,
    ciudad : req.body.ciudad,
    direccion : req.body.direccion,
    contraseña : req.body.contraseña
  };

  User.findOneAndUpdate({_id: id}, user, (err, params) => {
      if(err){
      res.status(500).json({
        "msn" : "Error no se pudo actualizar los datos"
      });
      return;
    }
    res.status(200).json(params);
    return;
  });
});







//res.render('index', { title: 'Express' });

module.exports = router;
