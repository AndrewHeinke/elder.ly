var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');

//create an express instance
var app = express();
//establish the port to listen on
var PORT = process.env.PORT || 4444;

var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var configDB = require('./config/database.js');

// database configuration
mongoose.connect(configDB.url);

// log requests to the console
app.use(morgan('dev'));
// read cookies for auth
app.use(cookieParser());
//Configure body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/vnd.api+json'}));

// set up ejs for templating
app.set('view engine', 'ejs');

// required for passport
app.use(session({ secret: 'andrewissoawesome' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

//serve static content from the public directory
app.use(express.static('./public'));

// load routes and configured passport
require('./app/routes.js')(app, passport);

//listen on the assigned port
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
