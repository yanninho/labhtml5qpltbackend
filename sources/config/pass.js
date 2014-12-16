'use strict';

var mongoose = require('mongoose'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
//    GoogleStrategy = require('passport-google-oauth').OAuth2Strategy,
    User = require('../models/user');
    // configAuth = require('./auth');

// Serialize sessions
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findOne({ _id: id }, function (err, user) {
    done(err, user);
  });
});

// Use local strategy
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  function(email, password, done) {
    User.findOne({ email: email }, function (err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, {
          'errors': {
            'email': { type: 'Email is not registered.' }
          }
        });
      }
      if (!user.authenticate(password)) {
        return done(null, false, {
          'errors': {
            'password': { type: 'Password is incorrect.' }
          }
        });
      }
      return done(null, user);
    });
  }
));

// Use google strategy
// passport.use(new GoogleStrategy({

//         clientID        : configAuth.googleAuth.clientID,
//         clientSecret    : configAuth.googleAuth.clientSecret,
//         callbackURL     : configAuth.googleAuth.callbackURL,

//     },
//     function(token, refreshToken, profile, done) {

//         // make the code asynchronous
//         // User.findOne won't fire until we have all our data back from Google
//         process.nextTick(function() {

//             // try to find the user based on their google id
//             User.findOne({ 'google.id' : profile.id }, function(err, user) {
//                 if (err)
//                     return done(err);

//                 if (user) {

//                     // if a user is found, log them in
//                     return done(null, user);
//                 } else {
//                     // if the user isnt in our database, create a new user
//                     var newUser          = new User();

//                     // set all of the relevant information
//                     newUser.google.id    = profile.id;
//                     newUser.google.token = token;
//                     newUser.google.name  = profile.displayName;
//                     newUser.google.email = profile.emails[0].value; // pull the first email

//                     // save the user
//                     newUser.save(function(err) {
//                         if (err)
//                             throw err;
//                         return done(null, newUser);
//                     });
//                 }
//             });
//         });

//     }));
