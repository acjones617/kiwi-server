'use strict';

var controller = require('./user_controller');

module.exports = function(router) {
  router.route('/info')
    .get(controller.getUserInfo);

  router.route('/kiwis')
    .get(controller.getUserKiwis);

  router.route('/groups')
    .get(controller.getUserGroups);

  router.route('/allData')
    .get(controller.getAllData);
};
