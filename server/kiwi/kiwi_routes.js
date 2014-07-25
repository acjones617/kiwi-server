'use strict';

var controller = require('./kiwi_controller');

module.exports = function(router) {
  router.route('/add')
    .post(controller.addKiwi);

  router.route('/values')
    .get(controller.getKiwiValues)
    .post(controller.addKiwiValue);

  router.route('/update')
    .get(controller.getKiwiUpdates)
    .post(controller.addKiwiValue);

  router.route('/remove')
    .put(controller.removeKiwi);
};
