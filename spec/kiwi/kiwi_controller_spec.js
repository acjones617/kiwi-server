var request = require('supertest');
var app = require('../../server/main/app.js');
var sql = require('mssql');
var connection = require('../../server/main/db_connection')();
var Promise = require('bluebird');

var kiwiCtrl = require('../../server/kiwi/kiwi_controller');
var mockData = require('./kiwi_mockData');

describe('User Controller', function () {

  it('should have an add kiwi method', function () {
    expect(kiwiCtrl.addKiwi).toEqual(jasmine.any(Function));
  });

  it('should have a remove kiwi method', function () {
    expect(kiwiCtrl.removeKiwi).toEqual(jasmine.any(Function));
  });

});

describe('User Controller', function () {

  it('should redirect to login if invalid credentials given', function (done) {
    var dbRequest = new sql.Request(connection);
    Promise.promisifyAll(dbRequest);

    request(app)
    .post('/api/kiwi/add')
    .set('x-access-token', mockData.auth.invalidJwt)
    .send(mockData.signup)
    .end(function (err, res) {
      if (err) return done(err);
      expect(res.statusCode).toEqual(401);
      done();
    });
  })

  it('should be able to add a new kiwi', function (done) {
    var dbRequest = new sql.Request(connection);
    Promise.promisifyAll(dbRequest);

    // delete kiwi if it exists
    dbRequest.queryAsync(mockData.queries.deleteKiwi)
    .then(function() {
      request(app)
      .post('/api/kiwi/add')
      .set('x-access-token', mockData.auth.validJwt)
      .send(mockData.kiwi.valid)
      .end(function (err, res) {
        if (err) return done(err);
        expect(res.statusCode).toEqual(201);
        expect(res.body.message).toEqual('kiwi created');
        done();
      });
    })
  });

  it('should not be able to add an already existing kiwi', function (done) {
    var dbRequest = new sql.Request(connection);
    Promise.promisifyAll(dbRequest);

    request(app)
    .post('/api/kiwi/add')
    .set('x-access-token', mockData.auth.validJwt)
    .send(mockData.kiwi.valid)
    .end(function (err, res) {
      if (err) return done(err);
      expect(res.statusCode).toEqual(403);
      expect(res.body.error).toEqual('kiwi already exists');
      done();
    });
  });

});
