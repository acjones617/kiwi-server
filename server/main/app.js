'use strict';

var express      = require('express');
var app          = express();

/* Router */
var UserRouter        = express.Router();
var SessionRouter     = express.Router();
var SchemaRouter      = express.Router();

var routers = {};

routers.UserRouter        = UserRouter;
routers.SessionRouter     = SessionRouter;
routers.SchemaRouter      = SchemaRouter;

require('./config.js')(app, express, routers);

require('../user/user-routes')(UserRouter);
require('../session/session-routes')(SessionRouter);
require('../schema/schema-routes')(SchemaRouter);

module.exports = exports = app;

/* jslint node: true */
