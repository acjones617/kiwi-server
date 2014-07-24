var request = require('supertest');
var app = require('../../server/main/app.js');
var sql = require('mssql');
var connection = require('../../server/main/db_connection')();
var Promise = require('bluebird');

var authCtrl = require('../../server/auth/auth_controller');
var mockData = require('./auth_mockData');

describe('User Controller', function () {

  it('should have a login method', function () {
    expect(authCtrl.login).toEqual(jasmine.any(Function));
  });

  it('should have a signup method', function () {
    expect(authCtrl.signup).toEqual(jasmine.any(Function));
  });

});

describe('User Controller', function () {

  it('should be able to signup', function (done) {
    var dbRequest = new sql.Request(connection);
    Promise.promisifyAll(dbRequest);
    console.log(connection);

    // delete test user if it exists
    dbRequest.queryAsync(mockData.queries.deleteTestUser)
    .then(function() {
      request(app)
      .post('/auth/signup')
      .send(mockData.signup)
      .end(function (err, res) {
        if (err) return done(err);
        expect(res.statusCode).toEqual(201);
        expect(typeof res.body.kiwiToken).toEqual("string");
        done();
      });
    })
  });

  it('should 401 if signing up and email already taken', function (done) {
    request(app)
    .post('/auth/signup')
    .send(mockData.signup)
    .end(function (err, res) {
      if (err) return done(err);
      expect(res.statusCode).toEqual(403);
      expect(res.body.error).toEqual('user already exists');
      done();
    });
  });

  it('should login successfully if valid credentials given', function (done) {
    request(app)
    .post('/auth/login')
    .send(mockData.login.valid)
    .end(function (err, res) {
      if (err) return done(err);
      expect(res.statusCode).toEqual(201);
      expect(typeof res.body.kiwiToken).toEqual("string");
      done();
    });
  });

  it('should not login successfully if invalid credentials given', function (done) {
    request(app)
    .post('/auth/login')
    .send(mockData.login.invalid)
    .end(function (err, res) {
      if (err) return done(err);
      expect(res.statusCode).toEqual(401);
      expect(res.body.kiwiToken).toEqual(undefined);
      expect(res.body.error).toEqual(undefined);
      done();
    });
  });

});