var request = require('supertest');
var app = require('../../server/main/app.js');
var dbRequest = require('../../server/main/db_connection')();

var userCtrl = require('../../server/user/user_controller');
var mockData = require('./user_mockData');
var authData = require('../auth/auth_mockData').auth;

describe('User Controller', function () {

  it('should have a getUserInfo method', function () {
    expect(userCtrl.getUserInfo).toEqual(jasmine.any(Function));
  });

});

describe('User Controller', function () {

  it('should return user info', function (done) {
    request(app)
    .get('/api/user/info')
    .set('x-access-token', authData.validJwt)
    .end(function (err, res) {
      if (err) return done(err);
      console.log(res.body.user);
      expect(res.statusCode).toEqual(200);
      expect(res.body.user.email).toEqual('test@test.com');
      done();
    });
  });
});
