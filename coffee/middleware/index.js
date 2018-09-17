var Cafe = require('../models/cafe');
var Comment = require('../models/comment');

var middlewareObj = {};

middlewareObj.checkCafeOwnership = function(req, res, next){
    if(req.isAuthenticated()) {
      Cafe.findById(req.params.id, function(err, foundCafe){
        if(err){
          req.flash("error", "Cafe not found");
          res.redirect('back');
        } else {
          if(foundCafe.author.id.equals(req.user._id)) {
            next();
          } else {
            req.flash("error", "Sorry! The owner might be upset if you delete their cafe! :( )");
            res.redirect('back');
          }
        }
      });
    } else {
      res.redirect('back');
    }
  }


middlewareObj.checkCommentOwnership = function(req, res, next){
    if(req.isAuthenticated()) {
      Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err){
          req.flash("error", "Something went wrong");
          res.redirect('back');
        } else {
          if(foundComment.author.id.equals(req.user._id)) {
            next();
          } else {
            req.flash("error", "You don't have permission to do that");
            res.redirect('back');
          }
        }
      });
    } else {
      // req.flash("error", "Would you like to join?");
      res.redirect('back');
    }
  }

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
      return next();
    }
    // req.flash("error", "Would you like to join?");
    res.redirect('/login');
  }

module.exports = middlewareObj
