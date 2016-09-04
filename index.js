// Dependencies
var _ = require('lomath');
var express = require('express');
var app = express();

// Express middlewares
var morgan = require('morgan');
var ejs = require('ejs');
var bodyParser = require('body-parser');
var multer = require('multer');

// Init Telegram bot
var bot = require(__dirname + '/bot.js');
var fleimiBot = new bot(process.env.TOKEN, process.env.WEBHOOK);
console.log('token: ' + process.env.TOKEN);
console.log('webhook: ' + process.env.WEBHOOK);

// HTML render engine
app.engine('.html', ejs.__express);
app.set('view engine', 'html');

// Set port
app.set('port', process.env.PORT);

// Mount middlewares defaulted for root:
// Log all HTTP calls for debugging
app.use(morgan('combined'));

// Use resources for html: HTML, JS and CSS etc.
app.use(express.static(__dirname + '/views'));

// Parse incoming formData into JSON
app.use(bodyParser.json());
app.use(multer());


// Routes
app.route('/')
  .get(function(req, res) {
      // console.log("you GET")
      res.render('index')
  })
  .post(function(req, res) {
      // send back to end req-res cycle
      res.json('okay, received\n');
      // robot handle as middleware for POST
      fleimiBot.handle(req, res)
  })
  .put(function(req, res) {
      res.send("you just called PUT\n")
  });

// Listen to the port
app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
