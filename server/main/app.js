'use strict';

var express      = require('express');
var app          = express();

/* Router */
var SchemaRouter      = express.Router();
var AuthRouter        = express.Router();
var KiwiRouter        = express.Router();

var routers = {};

routers.SchemaRouter      = SchemaRouter;
routers.AuthRouter        = AuthRouter;
routers.KiwiRouter        = KiwiRouter;

// connect to database once
require('./db_connection');

require('./config.js')(app, express, routers);

require('../schema/schema_routes')(SchemaRouter);
require('../auth/auth_routes')(AuthRouter);
require('../kiwi/kiwi_routes')(KiwiRouter);

module.exports = exports = app;

/* jslint node: true */
