
// Setup  ========================
var express = require('express');
var app = express();
var db = require('./db');
var axios = require('axios');
var morgan = require('morgan');
var parser = require('body-parser');
var controller = require('./controllers');
var router = require('express').Router();


// Configuration  ========================
app.use(express.static('public')); // Serve the client files
app.use('/game', express.static('src/racer')); // Serve the client files
app.use('/hex', express.static('src/HexGL')); // Serve the client files
app.use('/wolf', express.static('src/shooter')); // Serve the client files
app.use('/fighter', express.static('src/fighter')); // Serve the client files
app.use(morgan('dev')); //logging
app.use(parser.json()); //parsing
app.use('/', router); // Set up our routes


// Routes ========================
// Connect controller methods to their corresponding routes
router.get('/questions', controller.questions.get);
router.post('/questions', controller.questions.post);
//router.get('/users', controller.users.get);
//router.post('/users', controller.users.post);
router.get('/results', controller.results.get);
router.post('/results', controller.results.post);
router.get('/tests', controller.tests.get);
router.post('/tests', controller.tests.post);

// Port ========================
app.set('port', 1337);
// If we are being run directly, run the server.
if (!module.parent) {
  app.listen(app.get('port'));
  console.log('Listening on', app.get('port'));
}


// Module exports ========================
module.exports.app = app;
module.exports = router;
