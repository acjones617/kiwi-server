'use strict';

var express      = require('express');
var app          = express();

/* Router */
var UserRouter        = express.Router();
var SessionRouter     = express.Router();
var NotFoundRouter    = express.Router();

var routers = {};

routers.UserRouter        = UserRouter;
routers.SessionRouter     = SessionRouter;
routers.NotFoundRouter    = NotFoundRouter;

require('./config.js')(app, express, routers);

require('../user/user-routes')(UserRouter);
require('../session/session-routes')(SessionRouter);
// require('./notFound')(NotFoundRouter);

module.exports = exports = app;

/* jslint node: true */
