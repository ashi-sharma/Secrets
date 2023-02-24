//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

mongoose.set('strictQuery', false);
mongoose.connect("mongodb://localhost:27017/userDB", {useNewUrlParser: true});

const app = express();

app.use(express.static("public"));
app.set('view engine','ejs');

app.use(bodyParser.urlencoded({
    extended: true
}));

const userSchema = new mongoose.Schema({
    email: String,
    password: String
});

const User = mongoose.model("User", userSchema); 

app.get('/', function(req, res){
    res.render("home");
});

app.get('/register', function(req, res){
    res.render("register");
});

app.get('/login', function(req, res){
    res.render("login");
});

app.post('/register', function(req, res){
    console.log(req.body);
    const newUser = new User({
        email: req.body.username,
        password: req.body.password
    });

    newUser.save(function(err){
        if(err){
            console.log(err);
        }
        else{
            res.render("secrets");
        }
    });

});

app.listen(3000, function(){
    console.log("Server started at port 3000.")
});