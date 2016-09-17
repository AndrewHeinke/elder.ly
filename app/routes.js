module.exports = function(app, passport) {

  app.get('/', function(req, res) {
    res.render('index');
  });

  app.get('/login', function(req,res) {
    res.render('login', {message: req.flash('loginMessage')});
  });

  app.get('/signup', function(req,res) {
    res.render('signup', {message: req.flash('signupMessage')});
  });

  app.get('/profile', isLogginIn, function(req, res) {
    res.render('profile', {
      user: req.user
    });
  });

  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/');
  }


};
