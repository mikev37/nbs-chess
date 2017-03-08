var mongoose = require('mongoose');


var Game = mongoose.Schema({
    name        : String,
    winner      : String,
    white_player : String,
    black_player : String,
    is_white : Boolean,
    turn_num : Number,
    board_state : [
        [
            {
                piece   :   String,
                owner   :   String,
                tile    :   String,
                x       :   Number,
                y       :   Number,
                selected:   Boolean,
                movable :   Boolean,
                attack_able:Boolean,
                threatened :Boolean,
                supported  :Boolean
            }
        ]
    ],
    selected : String,
    last_action_date : Date,
    last_action : String,
    white_captured : [{name:String}],
    black_captured : [{name:String}],
    start_date : Date,
    end_date : Date
});

Game.methods.is_Over = function (){
   return this.end_date !== -1; 
};

exports.Game = Game;