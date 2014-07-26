'use strict';

var express      = require('express');
var app          = express();

/* Router */
var SchemaRouter      = express.Router();
var AuthRouter        = express.Router();
var UserRouter        = express.Router();
var KiwiRouter        = express.Router();
var NotFoundRouter    = express.Router();

var routers = {};

routers.SchemaRouter      = SchemaRouter;
routers.AuthRouter        = AuthRouter;
routers.UserRouter        = UserRouter;
routers.KiwiRouter        = KiwiRouter;
routers.NotFoundRouter    = NotFoundRouter;

// connect to database once
require('./db_connection');

require('./config.js')(app, express, routers);

require('../schema/schema_routes')(SchemaRouter, app);
require('../auth/auth_routes')(AuthRouter);
require('../user/user_routes')(UserRouter);
require('../kiwi/kiwi_routes')(KiwiRouter);
require('../main/notFound')(NotFoundRouter);

module.exports = exports = app;

/* jslint node: true */
