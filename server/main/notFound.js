var controller = require('./kiwi_controller');

module.exports = function(router) {
  router.route('/').all(function(req, res) {
    res.send({ user: req.user }, 404);
  });
};
