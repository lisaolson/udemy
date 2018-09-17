var     express      = require('express');
var     router       = express.Router();
var     Cafe         = require('../models/cafe');
var     middleware   = require('../middleware');
var     geocoder     = require('geocoder');


router.get('/home', function(req, res){
  res.render('home');
});

router.get('/cafes', function(req, res) {
  Cafe.find({}, function(err, allCafes){
    if(err) {
      console.log(err);
    } else {
      res.render('cafes/cafes', {cafes:allCafes, currentUser: req.user});
    }
  });
});

router.post('/cafes', middleware.isLoggedIn, function(req, res){
  // get data from form and add to cafes array
  var name = req.body.name;
  var price = req.body.price;
  var image = req.body.image;
  var desc = req.body.description;
  var author = {
    id: req.user._id,
    username: req.user.username
  };
  geocoder.geocode(req.body.location, function(err, data) {
      var lat = data.results[0].geometry.location.lat;
      var lng = data.results[0].geometry.location.lng;
      var location = data.results[0].formatted_address;
      var newCafe = {name: name, price: price, image: image, description: desc, author: author, location: location, lat: lat, lng: lng};
      // create new cafe and save to database
      Cafe.create(newCafe, function(err, newlyCreated){
        if(err){
          console.log(err);
        } else {
            res.redirect('/cafes');
        }
      })
  });
});

router.get('/cafes/new', middleware.isLoggedIn, function(req, res){
  res.render('cafes/new');
});

router.get('/cafes/:id', function(req, res){
  Cafe.findById(req.params.id).populate('comments').exec(function(err, foundCafe){
    if(err){
      console.log(err);
    } else {
      console.log(foundCafe);
      res.render('cafes/show', {cafe: foundCafe});
    }
  });
});

router.get('/cafes/:id/edit', middleware.checkCafeOwnership, function(req, res){
  Cafe.findById(req.params.id, function(err, foundCafe){
    res.render('cafes/edit', {cafe: foundCafe});
  });
});

router.put("/cafes/:id", function(req, res){
  geocoder.geocode(req.body.location, function (err, data) {
    var lat = data.results[0].geometry.location.lat;
    var lng = data.results[0].geometry.location.lng;
    var location = data.results[0].formatted_address;
    var newData = {name: req.body.name, image: req.body.image, description: req.body.description, cost: req.body.cost, location: location, lat: lat, lng: lng};
    Cafe.findByIdAndUpdate(req.params.id, {$set: newData}, function(err, cafe){
        if(err){
            req.flash("error", err.message);
            res.redirect("back");
        } else {
            req.flash("success","Successfully Updated!");
            res.redirect("/cafes/" + cafe._id);
        }
    });
  });
});

router.delete('/cafes/:id', middleware.checkCafeOwnership, function(req, res){
  Cafe.findByIdAndRemove(req.params.id, function(err){
    if(err){
      res.redirect('/cafes');
    } else {
      req.flash("success", "No worries, it's deleted");
      res.redirect('/cafes');
    }
  });
});

module.exports = router;
