'use strict';

var controller = require('./schema_controller');

module.exports = function(router, app) {
  router.route('/rebuild')
    .get(controller(app).rebuild);
};

