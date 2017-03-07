/** user.js **/
var mongoose = require('mongoose');


var User = mongoose.Schema({
    name        : String,
    email       : String,
    password    : String,
    games       : [ {game_id : String} ], 
    last_played : [ {player_id : String} ], 
    joined      : Date
});

exports.User = User;
