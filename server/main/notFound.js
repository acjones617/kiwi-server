'use strict';

module.exports = function(router) {
  router.route('/').all(function(req, res) {
    res.send({ user: req.user }, 404);
  });
};
