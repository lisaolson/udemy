var mongoose = require('mongoose');
var Cafe = require('./models/cafe');
var Comment = require('./models/comment');

var data = [
  {
    name: 'CoffeeShop',
    image: 'https://newhaveneats.files.wordpress.com/2012/09/cafe-romeo-lattes.jpg',
    description: 'string string string lorem ipsum dolor blah'
  },
  {
    name: 'Pacific Bay',
    image: 'http://www.amazingmarriageadventure.com/wp-content/uploads/2015/03/50-States-50-Lattes-Intro-Espresso-Coffee-Shop-Latte-Art-Photo-001.jpg',
    description: 'string string string lorem ipsum dolor blah'
  },
  {
    name: 'Panera Bread',
    image: 'http://ooolalattes.com/files/2016/06/classic-latte.jpg',
    description: 'string string string lorem ipsum dolor blah'
  }
];

function seedDB(){
  // remove all cafes
  Cafe.remove({}, function(err){
    if(err){
      console.log(err);
    }
    console.log('removed cafes');
  });

  // add a few cafes
  data.forEach(function(seed){
    Cafe.create(seed, function(err, cafe){
      if(err){
        console.log(err)
      } else {
        console.log('added a cafe');
        // create a comment
        Comment.create(
          {
          text: 'This place is great, but I wish there was wifi',
          author: 'Homer'
        }, function(err, comment){
          if(err){
            console.log(err);
          } else {
            cafe.comments.push(comment);
            cafe.save();
            console.log('created new comment');
          }
        });
    }
    });
  });
//
}

module.exports = seedDB;
