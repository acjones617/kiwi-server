'use strict';

var express      = require('express');
var app          = express();

/* Router */
var SchemaRouter      = express.Router();
var LoginRouter       = express.Router();
var AuthRouter        = express.Router();

var routers = {};

routers.SchemaRouter      = SchemaRouter;
routers.AuthRouter        = AuthRouter;
// routers.UserRouter        = UserRouter;

require('./config.js')(app, express, routers);

require('../schema/schema-routes')(SchemaRouter);
require('../auth/auth-routes')(AuthRouter);

module.exports = exports = app;

/* jslint node: true */
