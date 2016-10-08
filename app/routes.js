var User = require('./models/user.js');

module.exports = function(app, passport) {

  app.get('/', function(req, res) {
    res.render('pages/index', {
      user: req.user,
    });
  });

  app.get('/login', function(req,res) {
    res.render('pages/login', {message: req.flash('loginMessage')});
  });

  app.get('/signup', function(req,res) {
    res.render('pages/signup', {message: req.flash('signupMessage')});
  });

  app.get('/profile', isLoggedIn, function(req, res) {
    res.render('pages/profile', {
      user: req.user
    });
  });

  app.get('/about', function(req, res) {
    res.render('pages/about', {
      user: req.user
    });
  });

  app.get('/search', isLoggedIn, function(req, res) {
    var userState = req.user.local.state;
    var userCity = req.user.local.city;
    var userID = req.user._id;
    // want to query the database so it will only return users who are volunteers and are in the same city and state as the member trying to access the search page. Will exclude the user from showing up if the user is a volunteer
    User.find({'local.userType' : 'volunteer', 'local.state' : userState, 'local.city' : userCity, '_id': { $nin: userID }}, function(err, doc) {
      if (err) {
        res.send(err);
      }
      else {
        console.log(doc);
        res.render('pages/search', {
          list: doc,
          user: req.user
        });
      }
    });
  });

  // Get a specifc profile page for a user (volunteer)
  app.get('/user/:id', isLoggedIn, function(req, res) {
    User.findOne({'_id': req.params.id}, function(err, doc) {
      if (err) {
        res.send(err);
      }
      else {
        console.log(doc);
        res.render('pages/user', {
          list: doc,
          user: req.user
        });
      }
    });
  });

  // post reviews to specific users page
  app.post("/user/:id/review", function(req, res) {
    console.log("Req User: " + req.user);
    req.user.local.reviews.push(req.body);
    req.user.save(function(err, question) {
      if(err) return next(err);
      res.json(question);
    });
  });

  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
  }));

  app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash: true
  }));

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/');
  }

};
