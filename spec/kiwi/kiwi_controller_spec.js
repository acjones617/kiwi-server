var request = require('supertest');
var app = require('../../server/main/app.js');
var dbRequest = require('../../server/main/db_connection');

var kiwiCtrl = require('../../server/kiwi/kiwi_controller');
var mockData = require('./kiwi_mockData');
var authData = require('../../server/main/config_db_development');
var testData = require('../../server/schema/schema_mockData');

var getTestKiwi = function() {
  return dbRequest.queryAsync(mockData.queries.getTestKiwi);
}

describe('Kiwi Controller', function () {
  
  it('should have an add kiwi method', function () {
    expect(kiwiCtrl.addKiwi).toEqual(jasmine.any(Function));
  });

  it('should have a remove kiwi method', function () {
    expect(kiwiCtrl.removeKiwi).toEqual(jasmine.any(Function));
  });

  it('should have an add kiwi value method', function () {
    expect(kiwiCtrl.addKiwiValue).toEqual(jasmine.any(Function));
  });

  it('should have a get kiwi values method', function () {
    expect(kiwiCtrl.getKiwiValues).toEqual(jasmine.any(Function));
  });

  it('should have a get kiwi updates method', function () {
    expect(kiwiCtrl.getKiwiUpdates).toEqual(jasmine.any(Function));
  });

});

describe('Kiwi Controller', function () {

  it('should be able to add a new kiwi', function (done) {
    // delete all kiwi values on kiwi if they exist
    dbRequest.queryAsync(mockData.queries.deleteKiwiValues)
    .then(function() {
      // delete kiwi if it exists
      return dbRequest.queryAsync(mockData.queries.deleteKiwi)
    })
    .then(function() {
      request(app)
      .post('/api/kiwi/add')
      .set('x-access-token', authData.validJwt)
      .send(mockData.kiwi.valid)
      .end(function (err, res) {
        if (err) return done(err);
        console.log('CREATED KIWI?!', res.body.message);
        expect(res.statusCode).toEqual(201);
        expect(res.body.message).toEqual('kiwi created');
        done();
      });
    })
  });

  it('should not be able to add an already existing kiwi', function (done) {
    request(app)
    .post('/api/kiwi/add')
    .set('x-access-token', authData.validJwt)
    .send(mockData.kiwi.invalid)
    .end(function (err, res) {
      if (err) return done(err);
      expect(res.statusCode).toEqual(403);
      expect(res.body.error).toEqual('kiwi already exists');
      done();
    });
  });


  it('should be able to add a kiwi value', function (done) {
    getTestKiwi()
    .then(function(foundKiwi) {
      request(app)
      .post('/api/kiwi/values/' + foundKiwi[0].id)
      .set('x-access-token', authData.validJwt)
      .send(mockData.kiwiValues)
      .end(function (err, res) {
        if (err) return done(err);
        expect(res.statusCode).toEqual(201);
        done();
      });
    })
  });


  it('should be able to retrieve that same kiwi value', function (done) {
    getTestKiwi()
    .then(function(foundKiwi) {
      request(app)
      .get('/api/kiwi/values/' + foundKiwi[0].id)
      .set('x-access-token', authData.validJwt)
      .end(function (err, res) {
        if (err) return done(err);
        expect(res.statusCode).toEqual(200);
        expect(res.body.data[0].value).toEqual(mockData.kiwiValues.kiwiData.value);
        done();
      });
    })
  });

  it('should be able to retrieve kiwis needing updating', function (done) {
    request(app)
    .get('/api/kiwi/update')
    .set('x-access-token', authData.validJwt)
    .end(function (err, res) {
      if (err) return done(err);
      expect(res.statusCode).toEqual(200);
      expect(res.body.kiwisNeedingUpdate[0].title).toEqual(testData.kiwi.kiwiData.title);
      done();
    });
  });

  it('should be able to remove an already existing kiwi', function (done) {
    getTestKiwi()
    .then(function(foundKiwi) {
      request(app)
      .put('/api/kiwi/remove/' + foundKiwi[0].id)
      .set('x-access-token', authData.validJwt)
      .end(function (err, res) {
        if (err) return done(err);
        expect(res.statusCode).toEqual(200);
        done();
      });
    })
  });
});
