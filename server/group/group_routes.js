'use strict';

var controller = require('./group_controller');

module.exports = function(router) {
  router.route('/info/:groupId')
    .get(controller.getGroupInfo)
    .put(controller.editGroupInfo);

  router.route('/kiwis/:groupId')
    .get(controller.getKiwis)
    .post(controller.addKiwi)
    .delete(controller.removeKiwi);

  router.route('/create')
    .post(controller.createGroup);

  router.route('/remove/:groupId')
    .put(controller.removeGroup);
};
