var mongoose = require('mongoose');


var Game = mongoose.Schema({
    name        : String,
    winner      : String,
    white_player : String,
    black_player : String,
    check_black : Boolean,
    check_white : Boolean,
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
                moveable :   Boolean,
                attack_able:Boolean,
                passanted:  Boolean,
                threat_white : Number,
                threat_black  :Number
            }
        ]
    ],
    selected : {
        x   : Number,
        y   : Number,
        piece:String
    },
    last_action_date : Date,
    last_action : String,
    white_captured : [{name:String}],
    black_captured : [{name:String}],
    start_date : Date,
    end_date : Date,
    error_message : String
});

Game.methods.is_Over = function (){
   return this.end_date !== -1; 
};

exports.Game = Game;
