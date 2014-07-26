'use strict';

var express      = require('express');
var app          = express();

/* Router */
var SchemaRouter      = express.Router();
var AuthRouter        = express.Router();
var UserRouter        = express.Router();
var KiwiRouter        = express.Router();
var GroupRouter       = express.Router();

var routers = {};

routers.SchemaRouter      = SchemaRouter;
routers.AuthRouter        = AuthRouter;
routers.UserRouter        = UserRouter;
routers.KiwiRouter        = KiwiRouter;
routers.GroupRouter       = GroupRouter;

// connect to database once
require('./db_connection');

require('./config.js')(app, express, routers);

require('../schema/schema_routes')(SchemaRouter, app);
require('../auth/auth_routes')(AuthRouter);
require('../user/user_routes')(UserRouter);
require('../kiwi/kiwi_routes')(KiwiRouter);
require('../group/group_routes')(GroupRouter);

module.exports = exports = app;

/* jslint node: true */
