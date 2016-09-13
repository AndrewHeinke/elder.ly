var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
//  Include the IndexRoute (catch-all route)
var IndexRoute	= Router.IndexRoute;

//require the child components
var Main = require('../components/main.js');
var About = require('../components/children/about.js');
var Blog = require('../components/children/blog.js');
var Works = require('..components/children/works.js');

module.exports = (
  <Route path='/' component={Main}>
		<Route path='About' component={About}>
		</Route>
		<Route path='Works' component={Works} />
    <Router path = "Blog" component={Blog}/>
		<IndexRoute component={About} />
	</Route>
);
