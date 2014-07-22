'use strict';

var app   = require('./server/main/app.js');
var port  = app.get('port');

app.listen(port);
