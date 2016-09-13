var express = require('express');
var bodyParser = require('body-parser');

//create an express instance
var app = express();
//establish the port to listen on
var PORT = process.env.PORT || 4444;

//Configure body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/vnd.api+json'}));

//serve static content from the public directory
app.use(express.static('./public'));

//import and use the controller routes
var routes = require('./controllers/controller.js');
app.use('/', routes);

//listen on the assigned port
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
