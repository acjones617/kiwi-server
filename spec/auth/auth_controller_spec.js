var request = require('supertest');
var app = require('../../server/main/app.js');
var dbRequest = require('../../server/main/db_connection');

var authCtrl = require('../../server/auth/auth_controller');
var mockData = require('./auth_mockData');

describe('Auth Controller', function () {

  it('should have a login method', function () {
    expect(authCtrl.login).toEqual(jasmine.any(Function));
  });

  it('should have a signup method', function () {
    expect(authCtrl.signup).toEqual(jasmine.any(Function));
  });

});

describe('Auth Controller', function () {

  it('should be able to signup', function (done) {
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

  it('should 403 if signing up and email already taken', function (done) {
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
      expect(res.body.error.message).toEqual('This password is not correct.');
      done();
    });
  });
});

describe('API guard', function() {
  it('should redirect if invalid jwt credentials given', function (done) {
    request(app)
    .get('/api/*')
    .set('x-access-token', mockData.auth.invalidJwt)
    .end(function(err, res) {
      if (err) return done(err);
      expect(res.statusCode).toEqual(401);
      done();
    });
  });

  it('should add decoded req.user valid jwt credentials given', function (done) {
    request(app)
    .get('/api/*')
    .set('x-access-token', mockData.auth.validJwt)
    .end(function (err, res) {
      if (err) return done(err);
      expect(res.statusCode).toEqual(404);
      expect(res.body.user.email).toEqual('test@test.com');
      expect(res.body.user.hash_password).toEqual(undefined);
      done();
    });
  })
});
