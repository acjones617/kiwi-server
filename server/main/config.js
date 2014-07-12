"use strict";

var bodyParser     = require('body-parser'),
    middle         = require('./middleware'),
    morgan         = require('morgan'),
    methodOverride = require('method-override'),
    cors           = require('cors'),
    Promise        = require('bluebird');

/*
 * Include all global env variables here.
*/
module.exports = exports = function (app, express, routers) {
  app.set('ENV', 'development');

  var db_config = require('config_db')(app);

  var db_url = process.env.DB_URL || 'mongodb://localhost/kiwiApp';
  app.set('DB_URL', db_url);

  // connect to SQL


  // Bootstrap and promisify models
  var User = require('../user/user-model');

  app.engine('html', require('ejs').renderFile);
  app.set('view engine', 'html');
  app.use(morgan('dev'));
  app.use(bodyParser());
  app.use(methodOverride());
  app.use(cookieParser());

  // Persist sessions with mongoStore
  app.use(session({
    secret: 'angular-fullstack secret',
    maxAge: 3600000,
    store: new mongoStore({
      url: app.get('DB_URL'),
      collection: 'sessions'
    }, function () {
      console.log('db connection open');
    })
  }));

  // app.use(session({ secret: '09v2#jkb!' }));

  // Use passport session
  app.use(passport.initialize());
  app.use(passport.session());


  app.set('port', process.env.PORT || 3000);
  app.set('base url', process.env.URL || 'http://localhost');

  app.use(middle.cors);
  // app.use(cors());

  app.use('/api/session', routers.SessionRouter);

  app.use('/api/users' , routers.UserRouter);
  app.use('/api/*', routers.NotFoundRouter);

  app.use(middle.logError);
  app.use(middle.handleError);

  // Error handler - has to be last
  // if ('development' === app.get('env')) {
  //   app.use(errorHandler());
  // }
};