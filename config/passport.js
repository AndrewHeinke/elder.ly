var LocalStrategy = require('passport-local').Strategy;

var User = require('../app/models/user.js');

module.exports = function(passport) {
  // serialize and unserialize users out of a session
  // for persistent login sessions
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  passport.use('local-signup', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback: true
  },
  function(req, email, password, done) {
    process.nextTick(function() {
      User.findOne({'local.email' : email}, function(err, user) {
        if (err) {
          return done(err);
        }
        if (user) {
          return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
        }
        else {
          var newUser = new User();
          newUser.local.email = email;
          newUser.local.password = newUser.generateHash(password);
          newUser.local.firstName = req.body.firstName;
          newUser.local.lastName = req.body.lastName;
          newUser.local.dob = req.body.dob;
          newUser.local.city = req.body.city;
          newUser.local.state = req.body.state;

          newUser.save(function(err) {
            if (err) {
              throw err;
            }
            return done(null, newUser);
          });
        }
      });
    });
  }));

  passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
  function(req, email, password, done) {
      User.findOne({'local.email' : email}, function(err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, req.flash('loginMessage', 'No user found.'));
        }
        if (!user.validPassword(password)) {
          return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
        }
        return done(null, user);
      });
  }));
};
