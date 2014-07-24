"use strict";

var controller = require('./auth_controller');

module.exports = function(router) {
  router.route('/login')
    .post(controller.login);

  router.route('/signup')
    .post(controller.signup);
};
