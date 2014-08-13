'use strict';

var controller = require('./user_controller');

module.exports = function(router) {
  router.route('/info')
    .get(controller.getUserInfo)
    .put(controller.updateUserInfo);

  router.route('/kiwis')
    .get(controller.getUserKiwis);

  router.route('/allValues')
    .get(controller.getUserKiwisAndValues);

  router.route('/groups')
    .get(controller.getUserGroups);

  router.route('/allData')
    .get(controller.getAllData);
};
