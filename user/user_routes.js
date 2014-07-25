'use strict';

var controller = require('./user_controller');

module.exports = function(router) {
  router.route('/info')
    .get(controller.getUserInfo);
};
