//
// # SimpleServer
//
// A simple chat server using Socket.IO, Express, and Async.
//

var express = require('express');

//DB Stuff

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mydb');


var user_file = require("./models/user.js");
var UserSchema = user_file.User;

var game_file = require("./models/game.js");
var GameSchema = user_file.User;

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
                 res.send(usr);
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
                 res.send(usr);
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
            for (var i = 0; i < usr.games.length; i++){
                var game_id_obj = usr.games[i];
                Game.findOne({'_id':game_id_obj.game_id},function(err, gam) {
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

app.get('/game', function (req, res) {
    var user = Game.find({ name: /^Game/ }, function(err,usr){
        res.send(usr);
    });
   
});

app.post('/game', function (req, res) {
   
   var new_game = new Game({name : "Game",white_player :122,black_player :1223});
   new_game.save();
   res.send(new_game);
});



var server = app.listen(8081, process.env.IP, function(){
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
});

