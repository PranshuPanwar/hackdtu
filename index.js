/**
 * Created by Pranshu Panwar on 11-10-2017.
 */
var  express= require('express');
var mongoose = require('mongoose');
var pug = require('pug');
var bodyParser= require('body-parser');
var bcrypt = require('bcrypt');
var user= require('./models/user.js');

var app = express();

var db = mongoose.connect('mongodb://localhost:27107/twttr');
//setup
app.set('view engine', 'pug');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.get('/', function(req,res){
    res.render('index',{title:"home"});
})
//app.get('/user',function(req,res){
  //  res.render('user',{title :"user"})
//})
app.get('/login',function(req,res){
    res.render('login',{title:"login"})
})
app.post('/login', function(req,res){
    //res.send(req.body)
    User.findOne({username:req.body.username},function(err,user){
        if(err) {
            res.render('error',{title:'error',error:"no user such"+ req.body.username})
        }
        else {

        }
    })
})
//app.get('/register',function(req,res){
 //   res.render('register',{title:'register'})
//})
app.post('/register',function(req,res){
    //res.render(req.body)
    if(req.body.username && req.body.password){
        //existed
       // res.send(req.body.username)
        User.create({
            username : req.body.username,
            password : req.body.password
        },function(error,user) {
            if(error)
            {
                res.render('error',{title:"error",error:" opps username not created try again"});
            }
            else{
                res.send(user);
            }
        })

    }
    else{
        // not existed
        res.send('error',{ title: "error",error:"username and password are inncorrect"})
    }})
    app.get('/users.json',function (req, res) {
        User.find({}, function(err,users){
            if(err) throw err;
        else
            {
            response.send(users);
            }
        })
    })
    app.get('/register',function(req,res){
        res.render('register',{title:'register'})
})
app.listen(6970);