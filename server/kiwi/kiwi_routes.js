'use strict';

var controller = require('./kiwi_controller');

module.exports = function(router) {
  router.route('/add')
    .post(controller.addKiwi);

  router.route('/values/:kiwiId')
    .get(controller.getKiwiValues)
    .post(controller.addKiwiValue);

  router.route('/update')
    .get(controller.getKiwiUpdates);

  router.route('/edit/:kiwiId')
    .put(controller.editKiwi);
};
