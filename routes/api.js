var express = require('express');
var mongoose = require('mongoose');
var Superhero = mongoose.model('superheros');

var router = express.Router();


router.get('/superheros', function(req, res) {
  Superhero.find(function(err, superheros){
    console.log(superheros)
    res.render(
      'api',
      {title : 'Superhero API', superheros : superheros}
    );
  });
});

router.get('/superhero/:id', function(req, res) {
  var query = {"_id": req.params.id};
  Superhero.findOne(query, function(err, superhero){
    console.log(superhero)
    res.render(
      'superhero',
      {title : 'Superhero API - ' + superhero.name, superhero : superhero}
    );
  });
});


router.post('/superheros', function(req, res) {
  new Superhero({name : req.body.name})
  .save(function(err, superhero) {
    console.log(superhero)
    res.redirect('/api/superheros');
  });
});

router.put('/superhero/:id', function(req, res) {
  var query = {"_id": req.params.id};
  var update = {name : req.body.name};
  var options = {new: true};
  Superhero.findOneAndUpdate(query, update, options, function(err, superhero){
    console.log(superhero)
    res.render(
      'superhero',
      {title : 'Superhero API - ' + superhero.name, superhero : superhero}
    );
  });
});

router.delete('/superhero/:id', function(req, res) {
  var query = {"_id": req.params.id};
  Superhero.findOneAndRemove(query, function(err, superhero){
    console.log(superhero)
    res.redirect('/api/superheros');
  });
});

module.exports = router;