'use strict';

var app   = require('./server/main/app.js');
    // port  = app.get('port'),
    var port = process.env.PORT || 3000;

app.listen(port);
