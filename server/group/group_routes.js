'use strict';

var controller = require('./group_controller');

module.exports = function(router) {
  router.route('/info')
    .get(controller.getUserInfo);

  router.route('/kiwis')
    .get(controller.getUserKiwis);

};
