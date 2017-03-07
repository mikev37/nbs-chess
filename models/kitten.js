var mongoose = require('mongoose');



var Kitten = mongoose.Schema({
    name: String
});

Kitten.methods.speak = function () {
  var greeting = this.name
    ? "Meow name is " + this.name
    : "I don't have a name";
  console.log(greeting);
}

exports.Kitten = Kitten;