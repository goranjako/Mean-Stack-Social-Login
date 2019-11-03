var passport = require('passport');
var express = require('express');
var router = express.Router();
 var FacebookStrategy = require('passport-facebook').Strategy;
 var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var User= require('../models/user');
var Key = require('./key');

passport.serializeUser(function(user, callback){
  callback(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
}); 
   
   
//Facebook
passport.use(new FacebookStrategy({
    clientID : Key.facebookAuth.clientID,
   clientSecret: Key.facebookAuth.clientSecret,
   callbackURL: Key.facebookAuth.callbackURL,
   profileFields: ['id', 'displayName', 'email']
   },
   function(token, refreshToken, profile, done)  {
     process.nextTick(function()  {
         User.findOne({ 'facebook.id' : profile.id }, function (err, user) {
           if (err)
             return done(err);
           if (user) {
                 return done(null, user);
           } else {
             var newUser = new User();
             newUser.facebook.id= profile.id;
             newUser.facebook.token= token;
             newUser.facebook.name= profile.displayName;
             newUser.facebook.email= profile.email; // pull the first email
             newUser.save(function(err)  {
               if (err) throw err;
               return done(null, newUser);
             });
           }
       });
   });
 }
 ));
 
 //Google
 passport.use(new GoogleStrategy({
  clientID: Key.googleAuth.clientID,
  clientSecret: Key.googleAuth.clientSecret,
  callbackURL: Key.googleAuth.callbackURL

}, 
function(token, refreshToken, profile, done)  {
 process.nextTick(function()  {
     User.findOne({ 'google.id' : profile.id }, function(err, user)  {
       if (err)
         return done(err);

       if (user) {
             return done(null, user);
            
       } else {
         var newUser = new User();
  
         newUser.google.id    = profile.id;
         newUser.google.token = token;
         newUser.google.name  = profile.displayName;
         newUser.google.email = profile.emails[0].value; // pull the first email

         newUser.save(function(err)  {
           if (err) throw err;
           return done(null, newUser);
         });
       }
   });
});
}
));
module.exports=passport;