"use strict";

var bodyParser     = require('body-parser'),
    middle         = require('./middleware'),
    mongoose       = require('mongoose'),
    morgan         = require('morgan'),
    methodOverride = require('method-override'),
    cookieParser   = require('cookie-parser'),
    session        = require('express-session'),
    mongoStore     = require('connect-mongo')(session),
    cors = require('cors'),
    Promise        = require('bluebird');

    // compression = require('compression'),
    // favicon = require('static-favicon'),
    // path = require('path'),
    // config = require('./config'),
    // errorHandler = require('errorhandler'),
/*
 * Include all global env variables here.
*/
module.exports = exports = function (app, express, routers) {
  // var env = app.get('env');

  var db_url = process.env.DB_URL || 'mongodb://localhost/kiwiApp';
  app.set('DB_URL', db_url);

  // connect to MongoDB
  mongoose.connect(app.get('DB_URL'));

  // Bootstrap and promisify models
  var User = require('../user/user-model');

  Promise.promisifyAll(User);
  Promise.promisifyAll(mongoose);

  // Passport Configuration
  var passport = require('../session/passport')
    
  // if ('development' === env) {
  //   app.use(require('connect-livereload')());


  //   app.use(express.static(path.join(config.root, '.tmp')));
  //   app.use(express.static(path.join(config.root, 'app')));
  //   app.set('views', config.root + '/app/views');
  // }

  // if ('production' === env) {
  //   app.use(compression());
  //   app.use(favicon(path.join(config.root, 'public', 'favicon.ico')));
  //   app.use(express.static(path.join(config.root, 'public')));
  //   app.set('views', config.root + '/views');
  // }


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