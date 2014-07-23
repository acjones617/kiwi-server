"use strict";

var controller = require('./auth-controller');

module.exports = function(router) {
  router.route('/login')
    .post(controller.login)

  router.route('/signup')
    .post(controller.create)
};
