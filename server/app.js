// Loads express module and assigns it to a var called express
var express = require("express");

// Loads path to access helper functions for working with files and directory paths
var path = require("path");

// Loads bodyParser to populate and parse the body property of the request object
var bodyParser = require("body-parser");

// CONSTANTS --------------------------------------------------------------------------------------
const config = require('./config');

// Defines server port.
// Value of NODE_PORT is taken from the user environment if defined; port 3000 is used otherwise.
// Require process.env.PORT for Heroku to work - Don't set to any value, Heroku will auto assign a port to this variable
const NODE_PORT = process.env.PORT || process.env.NODE_PORT || config.PORT || 8080;

// Defines paths
// __dirname is a global that holds the directory name of the current module
// CLIENT FOLDER is the public directory
const CLIENT_FOLDER = path.join(__dirname, '/../client');  
const MSG_FOLDER = path.join(CLIENT_FOLDER, '/assets/messages');

// Creates an instance of express called app
var app = express();

// Connect to MongoDB Database - connection handler store at app.locals.db
// const db = require('./db');
require('./db')(app);

// MIDDLEWARES ------------------------------------------------------------------------------------

// Serves files from public directory (in this case CLIENT_FOLDER).
// __dirname is the absolute path of the application directory.
// if you have not defined a handler for "/" before this line, server will look for index.html in CLIENT_FOLDER
app.use(express.static(CLIENT_FOLDER));

// Populates req.body with information submitted through the registration form.
// Default $http content type is application/json so we use json as the parser type
// For content type application/x-www-form-urlencoded,
// use: app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));

// ROUTE HANDLERS ---------------------------------------------------------------------------------
// Load Routes handlers
// const routes = require('./routes')(app);
// Using a global db variable and passing it here will not work because of async
// Instead, use express app.locals.<variable> to persist store the connection at db.js
require('./routes')(app);

// ERROR HANDLING ---------------------------------------------------------------------------------
// Handles 404. In Express, 404 responses are not the result of an error,
// so the error-handler middleware will not capture them.
// To handle a 404 response, add a middleware function at the very bottom of the stack
// (below all other path handlers)
app.use(function(req, res) {
	res.status(404).sendFile(path.join(MSG_FOLDER + "/404.html"));
});

// Error handler: server error
app.use(function(err, req, res, next) {
	res.status(500).sendFile(path.join(MSG_FOLDER + '/500.html'));
});

// SERVER / PORT SETUP ----------------------------------------------------------------------------
// Server starts and listens on NODE_PORT
app.listen(NODE_PORT, function() {
	console.log("Server running at http://localhost:" + NODE_PORT);
});
