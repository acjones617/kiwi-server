"use strict";

var bodyParser     = require('body-parser'),
    middle         = require('./middleware'),
    morgan         = require('morgan'),
    methodOverride = require('method-override'),
    cors           = require('cors'),
    passport       = require('passport'),
    Promise        = require('bluebird');

/*
 * Include all global env variables here.
*/
module.exports = exports = function (app, express, routers) {
  app.engine('html', require('ejs').renderFile);
  app.set('view engine', 'html');
  app.use(morgan('dev'));
  app.use(bodyParser());
  app.use(methodOverride());

  // Use passport session
  app.use(passport.initialize());
  app.use(passport.session());


  app.set('port', process.env.PORT || 3000);
  app.set('base url', process.env.URL || 'http://localhost');

  // app.use(middle.cors);
  // app.use(cors());

  app.use('/schema' , routers.SchemaRouter);
  // app.use('/api/*', routers.NotFoundRouter);

  app.use(middle.logError);
  app.use(middle.handleError);

  // Error handler - has to be last
  // if ('development' === app.get('env')) {
  //   app.use(errorHandler());
  // }
};