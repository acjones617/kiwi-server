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

  // it('should be able to signup', function (done) {
  //   // delete test user if it exists
  //   dbRequest.queryAsync(mockData.queries.deleteTestUser)
  //   .then(function() {
  //     request(app)
  //     .post('/user/signup')
  //     .send(mockData.signup)
  //     .end(function (err, res) {
  //       if (err) return done(err);
  //       expect(res.statusCode).toEqual(201);
  //       expect(typeof res.body.kiwiToken).toEqual("string");
  //       done();
  //     });
  //   })
  // });

  // it('should 403 if signing up and email already taken', function (done) {
  //   request(app)
  //   .post('/user/signup')
  //   .send(mockData.signup)
  //   .end(function (err, res) {
  //     if (err) return done(err);
  //     expect(res.statusCode).toEqual(403);
  //     expect(res.body.error).toEqual('user already exists');
  //     done();
  //   });
  // });

  // it('should login successfully if valid credentials given', function (done) {
  //   request(app)
  //   .post('/user/login')
  //   .send(mockData.login.valid)
  //   .end(function (err, res) {
  //     if (err) return done(err);
  //     expect(res.statusCode).toEqual(201);
  //     expect(typeof res.body.kiwiToken).toEqual("string");
  //     done();
  //   });
  // });

  // it('should not login successfully if invalid credentials given', function (done) {
  //   request(app)
  //   .post('/user/login')
  //   .send(mockData.login.invalid)
  //   .end(function (err, res) {
  //     if (err) return done(err);
  //     expect(res.statusCode).toEqual(401);
  //     expect(res.body.kiwiToken).toEqual(undefined);
  //     expect(res.body.error.message).toEqual('This password is not correct.');
  //     done();
  //   });
  // });
});
