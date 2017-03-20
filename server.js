//
// # SimpleServer
//
// A simple chat server using Socket.IO, Express, and Async.
//

var express = require('express');

//DB Stuff

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mydb');


var init_board = require("./board.js");

init_board = init_board.board;

var user_file = require("./models/user.js");
var UserSchema = user_file.User;

var game_file = require("./models/game.js");
var GameSchema = game_file.Game;

var User = null;
var Game = null;

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("WE're IN!");
    User = mongoose.model('User', UserSchema);
    Game = mongoose.model('Game', GameSchema);
});

// Create application/x-www-form-urlencoded parser
var app = express();


//Parse the body of a request

var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

//email validator

var isemail = require('isemail');

/**
Getting a user given a password
In
   user_name OR email
   Password
Out
   User object
   Games_list
Unless
   Password Incorrect
   user DNE
*/
app.get('/user', function (req, res) {
    var user_email = req.body.user_email,
        password = req.body.password;
    if(isemail.validate(user_email)){
        User.findOne({'email':user_email,'password':password},function(err,usr){
             if (err) { res.status(500).send("Something went wrong on our end") }
             else if (usr == null) {
                 res.status(404).send("Username or password are incorrect");
             }
             else {
                 res.send(usr.toObject());
             }
        });
    }
    else{
        User.findOne({'name':user_email,'password':password},function(err,usr){
             if (err) { res.status(500).send("Something went wrong on our end") }
            else if (usr == null) {
                 res.status(404).send("Username or password are incorrect");
             }
             else{
                 res.send(usr.toObject());
             }
             
        });
    }
});


/*
Create a new user
In:
   user_name
   email
   password
   password_2
Out:
   New user created
Unless:
   Passwords don't match
   Email not real
   User email already exists
*/
app.post('/user', function (req, res) {
    try{
    var user_name = req.body.user_name,
        email = req.body.email,
        password = req.body.password,
        password_2 = req.body.password_2;
    
    if(isemail.validate(email))
    {
        if(password.length < 6){
            res.status(500).send("Password too short")
        }
        else if(password === password_2){
            User.findOne({'email':email},function(err,usr){
                if (err) { res.status(500).send("Something went wrong on our end") }
                if (!usr) {
                   var new_user = new User(
                       {'name' : user_name,
                       'email' : email,
                       'password' : password,
                       'games' : [],
                       'last_played' : [],
                       'joined' : new Date()});
                    new_user.save();
                    res.status(200).send("User created");
                }
                else{
                    res.status(500).send("user with that email already exists");
                }
            });
        }
        else{
            res.status(500).send("Passwords don't match!");
        }
    }
    else
    {
        res.status(500).send("Could not verify email");
    }
    }
    catch (TypeError)
    {
        res.status(500).send("One or more parameters are missing");
    }
});

/**
 * Get the list of recent players given the user id
In
   User
Out
   List of User objects they're involved in 
Unless
   User DNE
 */
app.get('/user/players', function (req, res) {
    var user_id = req.body.user_id;
    var responce = [];
    
    User.findOne({'_id':user_id},function(err,usr){
        if(err != null){
            res.status(500).send("Something went terribly wrong");
        }
        else if(usr === null)
        {
            res.status(404).send("User not found");
        }
        else
        {
            for (var i = 0; i < usr.last_played.length; i++){
                var game_id_obj = usr.last_played[i];
                User.findOne({'_id':game_id_obj.game_id},function(err, gam) {
                    if(err!=null){
                        responce.push({
                            name:"Error"
                        });
                    }
                    else responce.push(gam);
                });
            }
            res.send(responce);
        }
    });
});


/**
 * Get the list of games given the user id
In
   User
Out
   List of Game objects they're involved in 
Unless
   User DNE
 */
app.get('/user/games', function (req, res) {
    var user_id = req.body.user_id;
    var responce = [];
    
    User.findOne({'_id':user_id},function(err,usr){
        if(err != null){
            res.status(500).send("Something went terribly wrong");
        }
        else if(usr === null)
        {
            res.status(404).send("User not found");
        }
        else
        {
            usr = usr.toObject();
            for (var i = 0; i < usr.games.length; i++){
                var game_id_obj = usr.games[i];
                console.log("user games game obj: "+game_id_obj);
                responce.push(
                    Game.findOne({'_id':game_id_obj.game_id},
                        function(err,gam){
                            if(err==null){
                                console.log(gam._id);
                                console.log(gam);
                                return gam;
                            }
                            else return err;
                        }
                    ).exec()
                );
            }
            // console.log(" ");
            // console.log(responce);
            // console.log("_____________________");
            Promise.all(responce).then(function(){
                    console.log("Sending");
                    responce = responce.map(function(f){return f.emitted.fulfill[0];});
                    res.send(responce);
                });
            // responce = responce.map(function(f){f.resolve()}).then(
            //     function(){
            //         console.log("Sending");
            //         res.send(responce);
            //     });
            // console.log(" ");
            // console.log(responce);
            // console.log("_____________________");
            
            
            

        }
    });
});

/**
In
   Game 
Out
   Game as JSON
 */
app.get('/game', function (req, res) {
    var id = req.body.game_id;
    Game.findOne({ _id: id }, function(err,gam){
        if(err != null){
            res.status(500).send("Something went wrong");
        }
        else if(gam === null){
            res.status(404).send("Game not found");
        }
        else{
            res.send(gam);
        }
    });
   
});

function hasGameID(game_id) {
    game_id = game_id.toString();
    return function(element) {
        return element.game_id === game_id;
    }
}

/**
In
   Game
   White(true) or Black (false)
   User
Out
   Game as JSON, add the player to the white or black team
 */
app.get('/game/join', function (req, res) {
    var user_id = req.body.user_id,
        game_id = req.body.game_id,
        is_white = req.body.is_white.toLowerCase() == "true";

    Game.findOne({ _id : game_id }, function(err,gam){
        if(err != null){
            res.status(500).send("Something went wrong");
        }
        else if(gam === null){
            res.status(404).send("Game not found");
        }
        else{
            User.findOne({ _id : user_id }, function(err,usr){
                if(err != null){
                    res.status(500).send("Something went wrong");
                }
                else if(usr === null){
                    res.status(404).send("User not found");
                }
                else{
                    if(is_white){
                        if(gam.white_player === null){
                            gam.white_player = usr._id;
                            gam.save();
                            if(usr.games.find(hasGameID(gam._id))===null)
                            {
                                usr.games.push({'game_id':game_id});
                                usr.save();
                            }
                            res.send("Success!");
                        }
                        else{
                            res.status(423).send("There is already a white player");
                        }
                    }
                    else{
                        if(gam.black_player === null){
                            gam.black_player = usr._id;
                            gam.save();
                            if(usr.games.find(hasGameID(gam._id))===null)
                            {
                                usr.games.push({'game_id':game_id});
                                usr.save();
                            }
                            res.send("Success!");
                        }
                        else{
                            res.status(423).send("There is already a black player");
                        }
                    }
                }
            });
        }
    });
});

/**
In
   User, Game, x and y
Out
    Create a new game, assign the user to the game and such.
*/
app.put('/game/play', function (req, res) {
    var game_id = req.body.game_id,
        user_id = req.body.user_id,
        x = req.body.x,
        y = req.body.y;
        
    //find if user is even in the game
    User.findOne({ _id : user_id }, function(err,usr){
        if(err!==null){
            res.status(500).send(err);
        }
        else if(usr === null)
        {
            res.status(404).send("Could not find such a user");
        }
        else Game.findOne({ _id : game_id }, function(err, gam) {
            if(err!==null){
                res.status(500).send(err);
            }
            else if(gam === null)
            {
                res.status(404).send("Could not find such a game");
            }
            else {
                
                if(usr._id == gam.white_player || usr._id == gam.black_player){
                    
                    //find if user is the current turn
                    var white_usr = usr._id == gam.white_player && gam.is_white;
                    var black_usr = usr._id == gam.black_player && gam.is_black;
                    if(white_usr || black_usr){
                        //if(){
                            //if the piece is one of his own, make it the selected piece
                    
                            //if the piece is empty or enemy, check if the selected piece can move there
                            
                            //make the move
                        //}
                        res.send(gam);
                    }
                    else {
                        res.status(432).send("It is not your turn");
                    }
                }
                else{
                    res.status(423).send("User is not in the game");
                }
            }
        });
    });
});


/**
In
   User
Out
    Create a new game, assign the user to the game and such.
*/
app.post('/game', function (req, res) {
    var game_name = req.body.name,
        user_id = req.body.user_id;
    
    var new_game = new Game(
        {
            name        :   game_name,
            winner      :   null,
            white_player :  null,
            black_player :  null,
            is_white    :   true,
            turn_num    :   0,
            board_state :   init_board,
            white_captured: [],
            black_captured: [],
            last_action :   "First Turn",
            start_date  :   new Date(),
            selected    : null
        });
        
    var game_id = new_game._id;
    new_game.save();
        
    User.findOne({_id : user_id},function(err, usr) {
        if(err!= null)
        {
            res.status(500).send(err);   
        }
        else if(usr != null)
        {
            usr.games.push({'game_id':game_id});
            console.log(usr);
            usr.save();
        }
        else{
            res.status(404).send("Could not find user by id");   
        }
        
        res.send(new_game);
    });
   
});

/**
In
   User
   Game
Out
   Remove Player from Game
   Mark Game as Over
   Make other player Winner
 */
app.delete('/game', function (req, res) {
    var user_id = req.body.user_id,
        game_id = req.body.game_id;
        
    User.findOne({_id : user_id},function(err, usr) {
        if(err!= null)
        {
            res.status(500).send(err);   
        }
        else if(usr != null)
        {
            var usr_data = usr.toObject();
            console.log(usr_data);
            console.log(game_id);
            if(usr_data.games.find(function(element){
                return element.game_id === game_id;
            }) == null)
            {
                res.status(423).send("user does not have refrence to the game");   
            }
            else{
                Game.findOne({_id : game_id},function(err, gam) {
                    if(err!= null)
                    {
                        res.status(500).send(err);   
                    }
                    else if(gam != null){
                        console.log("white : "+gam.white_player);
                        console.log("black : "+gam.black_player);
                        console.log("user : "+usr._id);
                        var steve = String(gam.white_player) + "is "+String(usr._id)+" : "+(String(gam.white_player) === String(usr._id));
                        console.log(steve);
                        console.log("white ish : "+(gam.white_player === usr_data._id));
                        if(gam.white_player == usr_data._id)
                        {
                            gam.end_date = new Date();
                            gam.winner = gam.black_player;
                            gam.save();
                            if(gam.black_player === null)
                            {
                                usr.games.splice(usr.games.indexOf({'game-id':game_id}),1);
                                usr.save();
                            }
                            res.send(gam);
                        }
                        else if(gam.black_player == usr._id)
                        {
                            gam.end_date = new Date();
                            gam.winner = gam.white_player;
                            gam.save();
                            if(gam.white_player === null)
                            {
                                usr.games.splice(usr.games.indexOf({'game-id':game_id}),1);
                                usr.save();
                            }
                            res.send(gam);
                        }
                        else if(gam.black_player === null && gam.white_player === null){
                            gam.delete();
                            usr.games.splice(usr.games.indexOf({'game-id':game_id}),1);
                            usr.save();
                            
                            res.send(usr);
                        }
                        else{
                            res.status(423).send("user is not party to the game");   
                        }
                    }
                });   
            }
        }
    });
});




var server = app.listen(8081, process.env.IP, function(){
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
});

