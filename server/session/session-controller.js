'use strict';

// var mongoose = require('mongoose'),
var passport = require('passport');
var jwt = require('jwt-simple');

module.exports = {

  /**
   * Logout
   */

  logout: function (req, res) {
    req.logout();
    res.send(200);
  },

  /**
   * Login
   */

  login: function (req, res, next) {
    passport.authenticate('local', function(err, user, info) {
      var error = err || info;
      if (error) return res.json(401, error);

      var formattedData = { username: req.body.email, authorized: true, tokenDate: Date.now() };
      var token = jwt.encode(formattedData, 'keyboard cat');
      var sendData = { userToken: token, userInfo: user.userInfo };
      console.log('sendData: ', sendData);
      res.json(sendData);

      // req.logIn(user, function(err) {
      //   if (err) return res.send(err);
      //   console.log('test', req.user.userInfo, user);
      //   res.json(req.user.userInfo);
      // });
    })(req, res, next);
  }
};
