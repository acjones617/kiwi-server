"use strict";

var controller = require('./kiwi_controller');

module.exports = function(router) {
  router.route('/add')
    .post(controller.addKiwi);

  router.route('/remove')
    .delete(controller.removeKiwi);
};
