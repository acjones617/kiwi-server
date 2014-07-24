"use strict";

var controller = require('./schema_controller');

module.exports = function(router) {
  router.route('/rebuild')
    .get(controller.rebuild);
};

