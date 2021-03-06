var request = require('supertest');
var app = require('../../server/main/app.js');
var dbRequest = require('../../server/main/db_connection');

var userCtrl = require('../../server/user/user_controller');
var mockData = require('./user_mockData');
var authData = require('../../server/main/config_db_development');
var testData = require('../../server/schema/schema_mockData');

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
      expect(res.statusCode).toEqual(200);
      expect(res.body.user.email).toEqual(testData.signup.email);
      expect(typeof res.body.user.accountLevel).toEqual('string');
      expect(typeof res.body.user.notified).toEqual('boolean');
      expect(res.body.user.hash_password).toEqual(undefined);
      done();
    });
  });

  it('should return user kiwis', function (done) {
    request(app)
    .get('/api/user/kiwis')
    .set('x-access-token', authData.validJwt)
    .end(function (err, res) {
      if (err) return done(err);
      expect(res.statusCode).toEqual(200);
      expect(res.body.kiwis.length).toBeGreaterThan(0);
      expect(res.body.kiwis[0].title).toEqual(testData.kiwi.kiwiData.title);
      done();
    });
  });

  it('should return user groups', function (done) {
    request(app)
    .get('/api/user/groups')
    .set('x-access-token', authData.validJwt)
    .end(function (err, res) {
      if (err) return done(err);
      expect(res.statusCode).toEqual(200);
      expect(res.body.groups.length).toBeGreaterThan(0);
      expect(res.body.groups[0].name).toEqual(testData.group.groupData.name);
      done();
    });
  });

  it('should return all data for a user', function (done) {
    request(app)
    .get('/api/user/allData')
    .set('x-access-token', authData.validJwt)
    .end(function (err, res) {
      if (err) return done(err);
      expect(res.statusCode).toEqual(200);
      expect(res.body[testData.group.groupData.name][testData.kiwi.kiwiData.title].length).toBeGreaterThan(0);
      expect(res.body[testData.group.groupData.name][testData.kiwi.kiwiData.title][0].value).toEqual(testData.kiwi.kiwiData.value);
      done();
    });
  });

});
