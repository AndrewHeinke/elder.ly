var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var routes = require('./config/routes.js');
// Renders the contents according to the route page.
ReactDOM.render(

	<Router>{routes}</Router>,
	document.getElementById('app')
)
