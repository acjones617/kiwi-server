"use strict";

var controller = require('./schema-controller');

module.exports = function(router) {
  router.route('/rebuild')
    .get(controller.rebuild);
};

