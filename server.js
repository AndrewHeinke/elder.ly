var express = require('express');
var app = express();
// var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');

// variables for sass middleware to compile to css
var sassMiddleware = require('node-sass-middleware');
var serveStatic = require('serve-static');
var srcPath = __dirname + '/public/sass';
var destPath = __dirname + '/public/css';

// for image uploading and cloudinary hosting
var multer  = require('multer');
app.use(multer({
  dest: './public/uploads/'
}).single('uploadImg'));

//establish the port to listen on
var PORT = process.env.PORT || 4444;

var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var configDB = require('./config/database.js');

// if (process.env.MONGODB_URI) {
//   mongoose.connect(process.env.MONGODB_URI);
// } else {
//   mongoose.connect(configDB.url);
// }

// database configuration
// var db = mongoose.connection;

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

// pass active user session to template so I know who is logged in
app.use(function (req, res, next) {
  res.locals.login = req.isAuthenticated();
  next();
});

app.use(flash()); // use connect-flash for flash messages stored in session

// auto compiles sass to css
app.use('/css',
  sassMiddleware({
    src: srcPath,
    dest: destPath,
    debug: true,
    outputStyle: 'compressed',
  })
);

//serve static content from the public directory
app.use('/',
  serveStatic('./public', {})
);

require('./config/passport.js')(passport);
// load routes and configured passport
require('./app/routes.js')(app, passport);

//listen on the assigned port
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
