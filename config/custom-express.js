var express = require('express');
var consign = require('consign');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

module.exports = function(){
    var app = express();
    

    // Login OAuth2.0

    app.use(cookieParser());
    app.use(session(
        {
            secret : 'teste_palavra',
            resave:true,
            saveUninitialized:true
        }
    ));

    app.use(passport.initialize());
    app.use(passport.session());


    passport.use(new FacebookStrategy({
        clientID: 'CLIENT_ID',
        clientSecret: 'CLIENT_SECRET',
        callbackURL: "CALLBACK"
      },
      function(accessToken, refreshToken, profile, cb) {
        return cb(null, profile);
    }));

  passport.serializeUser(function(user, cb) {
    cb(null, user);
  });
  
  passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
  });


    // FIM DO Login

	app.use(bodyParser.urlencoded({extended:true}));
    app.use(bodyParser.json());
    app.use(express.static('public'));
    app.set('view engine', 'ejs');

	consign()
		.include('controllers')
		.then('routes')
		.into(app);
	return app;
}