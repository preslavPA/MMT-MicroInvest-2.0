/**
 * Created by preslav on 08-Jun-17.
 */
const express = require('express');
const config  = require('./webpack.config');
const path    = require('path');
const webpack = require('webpack');
const compiler = webpack(config);
const https = require('https');
const http = require('http');
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
var   bodyParser = require('body-parser');
var methodOverride = require('method-override');
var _ = require('lodash');
var fs    = require("fs");

var options = {
  key: fs.readFileSync('./certs/key.pem'),
  cert: fs.readFileSync('./certs/cert.pem')
};

const app = express();

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
  historyApiFallback: true
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

var allowCrossDomain = function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,OPTIONS,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');

  // intercept OPTIONS method
  if ('OPTIONS' == req.method) {
    res.sendStatus(200);
  }
  else {
    next();
  }

};
app.use(allowCrossDomain);

//Add Middleware necessary for REST API's
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));

//Connect to MongoDB


//mongoose.connect('mongodb://localhost/db');
// mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
//
//
// mongoose.connection.once('open', function () {
//
//   //Load models
//   console.log('Loading models from [/models]...');
//   app.models = require('./server-dev/models/index');
//   console.log('models loaded');
//   //Load routes
//   console.log('Loading routes from [/routes]');
//   var routes = require('./server-dev/routes');
//   _.each(routes, function (controller, route) {
//     app.use(route, controller(app, route));
//   });
//
//   console.log('Listening on port ' + port);
//
// });

console.log('Loading models from [/models]...');
app.models = require('./server-dev/models/index');
console.log('models loaded');
//Load routes
console.log('Loading routes from [/routes]');
var routes = require('./server-dev/routes');
_.each(routes, function (controller, route) {
  app.use(route, controller(app, route));
});
//http.createServer(app).listen(port);
https.createServer(options, app).listen(port);