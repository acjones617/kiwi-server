"use strict";

var bodyParser     = require('body-parser'),
    middle         = require('./middleware'),
    morgan         = require('morgan'),
    methodOverride = require('method-override'),
    passport       = require('../auth/passport_config'),
    errorHandler   = require('errorhandler'),
    Promise        = require('bluebird');

module.exports = exports = function (app, express, routers) {
  app.engine('html', require('ejs').renderFile);
  app.set('view engine', 'html');
  app.use(morgan('dev'));
  app.use(bodyParser());
  app.use(methodOverride());

  app.use(passport.initialize());

  app.set('port', process.env.PORT || 3000);
  app.set('base url', process.env.URL || 'http://localhost');

  app.use(middle.cors);

  app.use('/schema' , routers.SchemaRouter);
  app.use('/auth', routers.AuthRouter);

  // protect all api routes - user must provide valid jwt
  app.use('/api', middle.auth);

  app.use('/api/user', routers.UserRouter);
  app.use('/api/kiwi', routers.KiwiRouter);
  app.use('/api/group', routers.GroupRouter);


  app.use('/api/*', function(req, res, next) {
    next({ error: 'Not Found', status: 404 });
  });

  // Error handler
  app.use(middle.logError);
  app.use(middle.handleError);
};
